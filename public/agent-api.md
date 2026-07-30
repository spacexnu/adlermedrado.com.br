# Site Content API

The Site Content API provides anonymous, read-only access to the public
content on `adlermedrado.com.br`.

## Endpoints

- `GET /index.json` lists public pages and posts with canonical URLs,
  publication dates, sections, languages, and summaries.
- `GET /health.json` confirms that the static API can be served.
- `GET /.well-known/openapi.json` returns the OpenAPI 3.1 description.
- `GET /.well-known/api-catalog` returns the RFC 9727 API catalog.

No authentication, account, cookies, or client registration are required.
The API does not expose write operations.

HTML pages also support `Accept: text/markdown`. The server returns the
corresponding Markdown representation with `Content-Type: text/markdown`.
