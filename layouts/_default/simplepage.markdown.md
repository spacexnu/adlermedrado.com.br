---
title: {{ .Title | jsonify }}
description: {{ with .Description }}{{ . | jsonify }}{{ else }}{{ with .Summary }}{{ . | plainify | htmlUnescape | jsonify }}{{ end }}{{ end }}
url: {{ .Permalink | jsonify }}
{{- if not .Date.IsZero }}
date: {{ .Date.Format "2006-01-02T15:04:05Z07:00" | jsonify }}
{{- end }}
---

{{- $body := .RenderShortcodes -}}
{{- $trimmed := $body | strings.TrimLeft " \t\r\n" -}}
{{- if not (hasPrefix $trimmed "# ") }}
# {{ .Title }}

{{ end -}}
{{ $body }}
