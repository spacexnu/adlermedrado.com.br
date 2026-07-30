---
title: {{ .Title | jsonify }}
description: {{ .Description | default .Site.Params.description | jsonify }}
url: {{ .Permalink | jsonify }}
---

# {{ .Site.Title }}

{{ .Site.Params.description }}

## Site sections

- [About]({{ "about/" | absURL }})
- [Projects]({{ "projects/" | absURL }})
- [Posts]({{ "posts/" | absURL }})
- [Missives]({{ "missives/" | absURL }})
- [Now]({{ "now/" | absURL }})
- [Uses]({{ "uses/" | absURL }})
- [Contact]({{ "contact/" | absURL }})

## Latest posts

{{- $posts := where .Site.RegularPages "Type" "posts" }}
{{ range first 10 (sort $posts "Date" "desc") }}
- [{{ .Title }}]({{ .Permalink }}){{ with .Summary }}: {{ . | plainify | htmlUnescape | truncate 200 }}{{ end }}
{{- end }}

## Agent resources

- [Content API]({{ "index.json" | absURL }})
- [API catalog]({{ ".well-known/api-catalog" | absURL }})
- [Agent skills]({{ ".well-known/agent-skills/index.json" | absURL }})
- [LLM index]({{ "llms.txt" | absURL }})
