# Adler Medrado — Personal Website

This is the source code of my personal website, built with [Hugo](https://gohugo.io/) and served by [Nginx](https://nginx.org/) on a self-hosted VPS running Linux.

The site is my digital outpost: a space where I publish technical deep dives, personal reflections, short rants (*missives*), and whatever else doesn't fit into centralized platforms.

Everything here is self-managed, gpg-signed content, privacy-respecting, and tracker-free. No JavaScript bloat, no analytics, no external dependencies. Just static files and intent.

Visit: [https://adlermedrado.com.br](https://adlermedrado.com.br)

## Agent discovery

The Hugo build publishes Markdown page variants, a read-only content API,
RFC 9727 API discovery, Content Signals, an Agent Skills index, and WebMCP
tools. Run `make verify-agent-discovery` to validate the generated artifacts.
