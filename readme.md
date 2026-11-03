# Adler Medrado — Personal Website

This is the source code of my personal website, built with [Hugo](https://gohugo.io/) and served by [Nginx](https://nginx.org/) on a self-hosted VPS running Linux.

The site is my digital outpost: a space where I publish technical deep dives, personal reflections, short rants (*missives*), and whatever else doesn't fit into centralized platforms.

Everything here is self-managed, gpg-signed content, privacy-respecting, and tracker-free. No JavaScript bloat, no analytics, no external dependencies. Just static files and intent.

Visit: [https://adlermedrado.com.br](https://adlermedrado.com.br)

## Local development

Requirements: Linux (or WSL) or macOS, Make, curl, tar, and sha256sum or
shasum. The existing validation scripts also require Node.js 22+ and ripgrep.
No npm dependencies are needed.

```sh
make setup  # Download Hugo 0.167.0 and verify its release checksum
make build  # Generate the minified site in public/
make serve  # Start the development server at http://localhost:1313
```

Hugo is installed in `.tools/bin/`, ignored by Git. Make adds this directory
to PATH automatically; no global installation or sudo is needed. Run
`make setup` again when preparing a new checkout. To run Hugo directly, use
`.tools/bin/hugo`.

```sh
make verify-agent-discovery
make verify-site-ui
```

## Agent discovery

The Hugo build publishes Markdown page variants, a read-only content API,
RFC 9727 API discovery, Content Signals, an Agent Skills index, and WebMCP
tools. Run `make verify-agent-discovery` to validate the generated artifacts.
