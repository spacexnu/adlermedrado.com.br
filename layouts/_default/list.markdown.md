---
title: {{ .Title | jsonify }}
description: {{ with .Description }}{{ . | jsonify }}{{ else }}{{ .Site.Params.description | jsonify }}{{ end }}
url: {{ .Permalink | jsonify }}
---

# {{ .Title }}

{{ with .RawContent }}{{ . }}{{ end }}

## Entries

{{ range .Pages.ByDate.Reverse }}
- [{{ .Title }}]({{ .Permalink }}){{ if not .Date.IsZero }} - {{ .Date.Format "2006-01-02" }}{{ end }}{{ with .Summary }}: {{ . | plainify | htmlUnescape | truncate 200 }}{{ end }}
{{- end }}
