---
title: {{ .Title | jsonify }}
description: {{ .Description | default .Site.Params.description | jsonify }}
url: {{ .Permalink | jsonify }}
---

# {{ .Site.Title }}

{{ .Site.Params.description }}

Self-hosted, with an onion mirror, and published as Markdown so agents can read the same pages.

## Site sections

- [About]({{ "about/" | absURL }})
- [Projects]({{ "projects/" | absURL }})
- [Start here]({{ "start/" | absURL }})
- [Posts]({{ "posts/" | absURL }})
- [Missives]({{ "missives/" | absURL }})
- [Now]({{ "now/" | absURL }})
- [Uses]({{ "uses/" | absURL }})
- [Contact]({{ "contact/" | absURL }})

## Latest posts

{{ partial "latest-posts.html" (dict "format" "markdown") }}

## Agent resources

- [Content API]({{ "index.json" | absURL }})
- [API catalog]({{ ".well-known/api-catalog" | absURL }})
- [Agent skills]({{ ".well-known/agent-skills/index.json" | absURL }})
- [LLM index]({{ "llms.txt" | absURL }})
