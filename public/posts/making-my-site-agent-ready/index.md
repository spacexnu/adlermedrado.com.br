---
title: "From 21 to 71: Making My Site Legible to Agents"
description: "What I changed so agents can discover this site's content, APIs, and tools without inventing OAuth, MCP, or services that do not exist."
url: "https://adlermedrado.com.br/posts/making-my-site-agent-ready/"
date: "2026-07-29T00:00:00Z"
---

# From 21 to 71: Making My Site Legible to Agents


I entered this site's address into
[Is It Agent Ready?](https://isitagentready.com/) and got a score of 21.

After a few hours reading RFCs, working on Hugo, configuring Nginx, and taking a
deep breath before clicking the DNSSEC button at Registro.br, the score went up
to 71. The site reached the **Agent-Integrated** level.

The obvious temptation was to keep adding files until every scanner check
turned green. I did not.

A score is not an architecture. Publishing OAuth metadata without
authentication, or advertising an MCP server that does not exist, would be
technically dishonest. Agents would discover more files, but those files would
contain false information.

The goal was not to win the checklist video game. It was to make what already
exists here easier for agents to discover and consume.

## What it means to make a site agent-ready

A browser gives a person HTML and expects them to understand menus, links,
text, and forms. An agent can parse HTML too, but it should not have to guess
everything.

A more agent-friendly site answers a few questions explicitly:

- where its documentation lives;
- which APIs exist;
- how to obtain a representation without the noise of HTML;
- which uses of its content are permitted;
- which structured actions the page exposes;
- whether authentication is required;
- how to verify all of this over HTTP or DNS.

Most of that does not require a language model, a magical framework, or a new
SaaS subscription. It requires predictable formats, correct headers, and files
in standardized locations.

It is the least cinematic part of artificial intelligence: doing HTTP
properly.

## The architecture stayed simple

This site is generated with Hugo and published on my own VPS. Nginx serves the
static files. Cloudflare is my authoritative DNS provider, but nearly every
record is set to `DNS only`.

That gave me one implementation rule: anything that could be solved in Nginx
would be solved in Nginx.

I did not need to put the domain behind Cloudflare's proxy to get headers or
content negotiation. I also did not need to depend on Transform Rules, Workers,
or a feature available only on a paid plan.

Cloudflare remained responsible for DNS. Nginx remained responsible for HTTP.
Hugo remained responsible for content.

Separation of concerns still works, even when someone puts "AI" in the
problem's name.

## Link headers: discovery starts in the HTTP response

The first problem was straightforward: the homepage did not return a `Link`
response header.

I could already put `<link>` elements in the HTML `<head>`, but that is not the
same thing. [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) defines links at
the HTTP protocol level, allowing an agent to discover them without parsing the
entire document first.

Nginx now returns:

```text
Link: </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json",
      </.well-known/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json",
      </agent-api.md>; rel="service-doc"; type="text/markdown",
      </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"
```

That advertises the API catalog, the OpenAPI specification, the Markdown
documentation, and the skills index.

A request to `/` now comes with a map of the things a machine may want to fetch
next.

## HTML for people, Markdown for agents

The site still returns HTML by default. Nothing changed for someone opening a
page normally.

But a client can now send:

```http
Accept: text/markdown
```

and receive:

```http
Content-Type: text/markdown
Vary: Accept
```

Hugo generates a Markdown representation of every page during the build. Nginx
inspects the `Accept` header and serves the corresponding file.

The test is simple:

```bash
curl -I -H 'Accept: text/markdown' https://adlermedrado.com.br/
```

Cloudflare has a ready-made feature for this called Markdown for Agents. I
ignored it. The content already starts as Markdown, I control the server, and
converting my own HTML back into Markdown at the edge would be like paying for
an Uber ride to the corner of my own street.

## Content Signals: you may answer, but you may not train

The site's `robots.txt` now declares:

```text
User-agent: *
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=yes
```

Those three values mean different things:

- `search=yes`: permits indexing, links, and short excerpts in search results;
- `ai-input=yes`: permits using the content as real-time model input,
  including RAG, grounding, answers, and summaries;
- `ai-train=no`: does not permit training or fine-tuning.

My choice was to allow an agent to read a post in order to answer a question,
but not to authorize using that content as training material.

[Content Signals](https://contentsignals.org/) still depend on collectors
honoring the declaration. They are not a firewall. Even so, I would rather
state the intent explicitly than leave silence where a rule could exist.

## A catalog for an API that already existed

The site already published structured content. What it lacked was a
standardized way to discover it.

I created `/.well-known/api-catalog` following
[RFC 9727](https://www.rfc-editor.org/rfc/rfc9727). The catalog points to:

- `/index.json`, containing the list of pages and posts;
- `/.well-known/openapi.json`, containing the OpenAPI 3.1 description;
- `/agent-api.md`, containing the documentation;
- `/health.json`, containing the status of the static service.

The catalog is served as:

```http
Content-Type: application/linkset+json
```

It is not a write API, it has no database, and it does not accept commands. It
is simply a structured view of the public content the site already serves.

I also published `/.well-known/agent-skills/index.json`, with a skill named
`site-content`. It teaches an agent how to query the index, find a piece of
content, and request the Markdown representation of the selected page.

The index includes the SHA-256 digest of the `SKILL.md`, so the advertised
artifact can be verified before use.

## DNS-AID and the moment I got nervous

HTTP discovery works after an agent finds the site. DNS-AID lets the site
advertise its entry point in DNS itself.

I published this record at Cloudflare:

```dns
_index._agents.adlermedrado.com.br. 3600 IN SVCB 1 adlermedrado.com.br. alpn="h2" port=443 mandatory=alpn,port
```

It says that the agent index is available at the main domain over HTTP/2 on
port 443.

The next requirement was signing the zone with DNSSEC.

Enabling DNSSEC in Cloudflare was the easy part. The part that makes your hand
sweat is copying the DS record to Registro.br while knowing that one incorrect
value can make validating resolvers return `SERVFAIL`.

At Registro.br, I kept Cloudflare's two nameservers and filled in only:

- `Keytag 1`: the Key Tag shown by Cloudflare;
- `Digest 1`: the complete digest shown by Cloudflare.

After propagation:

```bash
dig @1.1.1.1 adlermedrado.com.br DS +dnssec
```

started returning:

```text
adlermedrado.com.br. 3600 IN DS 2371 13 2 ...
```

and, more importantly:

```text
flags: qr rd ra ad;
```

The `ad` flag means the resolver validated the DNSSEC chain. The scanner also
found the SVCB record with `AD=true`.

Fear over. DNS working. No domains were harmed during the process.

## WebMCP: tools in the browser

WebMCP allows a page to expose JavaScript functions as structured tools for
agents.

Instead of making an agent visually interpret the page, it receives a name, a
description, a JSON Schema for the parameters, and an execution function. The
specification is still under development, but the idea is sound: reduce
ambiguity between the human interface and the action a machine needs to
perform.

This site registers two tools:

```text
search_site_content
get_current_page
```

The first searches titles and summaries in `/index.json`. The second returns
the canonical URL, title, and description of the current page.

Both operations are read-only. They do not create accounts, send messages,
modify content, or collect visitor data.

One detail nearly slipped past me: my Content Security Policy began with
`default-src 'none'`. The JavaScript loaded, but the search tool's
`fetch("/index.json")` would have been blocked because there was no
`connect-src`.

The fix was specific:

```text
connect-src 'self'
```

The script is still forbidden from calling external services. It can only
query the site itself.

I do not have Chrome installed, and WebMCP is still in early preview. Even so,
I was able to validate the implementation: the local test captures the
registered tools, and Is It Agent Ready loaded the page as a browser and
detected both through `navigator.modelContext`.

## Auth.md without authentication theater

I also published `/auth.md`.

It does not teach an agent how to create an account because there is no
account. The file says:

```text
Registration is not required or available.
Authentication and credentials are not required.
There are no protected API scopes.
```

The scanner finds the document, confirms HTTP 200 and `text/markdown`, but
still marks the check as failed because there are no registration
instructions.

That is correct. There is no registration.

I would rather lose points with a truthful statement than gain points by
advertising fictional endpoints.

## What I deliberately did not implement

A few checks remain red:

- OAuth/OIDC Discovery;
- OAuth Protected Resource Metadata;
- Auth.md Agent Registration;
- MCP Server Card;
- A2A Agent Card.

They are not bugs on this site.

OAuth and OIDC make sense when there is a protected API, a login, tokens,
scopes, and a real authorization server. None of those exist here.

OAuth Protected Resource Metadata describes how to obtain authorization for a
protected resource. Every piece of content on this site is public.

An MCP Server Card requires a real MCP server with a real transport and
endpoint. WebMCP in the browser does not turn the domain into a remote MCP
server.

An A2A Agent Card describes an agent capable of communicating with other
agents. This site is a website, not an autonomous agent.

The commerce checks (x402, MPP, UCP, ACP, and AP2) show up in gray. They are
going to stay gray. I do not sell anything here, and the last thing I want is
to wake up one morning to find an agent buying hosting on my behalf.

Adding any of those things just to improve the score would be confusing
protocol support with collecting `.well-known` files.

## The result

The site went from 21 to 71 and reached the **Agent-Integrated** level.

These checks passed:

- Link headers;
- DNS-AID with DNSSEC;
- Markdown negotiation;
- Content Signals;
- API Catalog;
- Agent Skills;
- WebMCP;
- `robots.txt` and sitemap.

More important than the score, every green check corresponds to something that
actually exists and works.

Agents can now discover the content over HTTP and DNS, request Markdown, query
a catalog, understand the usage policy, and access structured browser tools.

Everything else remained absent because it should remain absent.

## What I learned

Making a site agent-ready does not mean turning everything into a chatbot,
adding login, or putting a language model on the server.

Most of the time, it means publishing good metadata, respecting protocols, and
not forcing a machine to guess something you could have declared explicitly.

It also means knowing when to say no.

A scanner is useful for finding gaps. It does not know the intent behind your
architecture. That part remains the responsibility of whoever operates the
site.

In the end, the most important improvement was not going from 21 to 71.

It was going from a site agents had to interpret to a site capable of
explaining itself, without lying about what it is.

## What about the Tor version?

And what about the version of this site running as an onion service on the Tor
network?

Obviously, I did not configure DNS-AID, DNSSEC, or dedicated discovery metadata
for it. You knew that, right? A `.onion` address is not part of the public DNS,
so there is no DS record at Registro.br, no SVCB record at Cloudflare, and no
DNSSEC chain to validate.

Both versions come from the same Hugo project, so some static files naturally
travel with the build. But turning the onion service into another target for an
agent-readiness scanner was never the point. It exists for a different reason:
access through Tor, with as few dependencies and as little exposure as possible.
And it is staying that way.

