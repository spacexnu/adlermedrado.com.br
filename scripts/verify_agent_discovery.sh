#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
BUILD_DIR=$(mktemp -d "${TMPDIR:-/tmp}/adler-agent-discovery.XXXXXX")
trap 'rm -rf "$BUILD_DIR"' EXIT INT TERM

cd "$ROOT_DIR"

hugo --quiet --gc --minify \
  --destination "$BUILD_DIR" \
  --cleanDestinationDir

for path in \
  index.html \
  index.md \
  index.json \
  health.json \
  auth.md \
  agent-api.md \
  .well-known/api-catalog \
  .well-known/openapi.json \
  .well-known/agent-skills/index.json \
  .well-known/agent-skills/site-content/SKILL.md \
  js/webmcp.js \
  robots.txt
do
  test -s "$BUILD_DIR/$path"
done

node "$ROOT_DIR/scripts/verify_agent_discovery.mjs" "$BUILD_DIR"

grep -Fq '### [Portuguese](' "$BUILD_DIR/index.md"
grep -Fq '### [English](' "$BUILD_DIR/index.md"
awk '
  /^### \[English\]/ { group = "en"; next }
  /^### \[Portuguese\]/ { if (group != "en") exit 1; group = "pt"; next }
  /^## / { group = "" }
  group == "pt" && /^- \[/ { pt++ }
  group == "en" && /^- \[/ { en++ }
  END { if (pt != 5 || en != 5) exit 1 }
' "$BUILD_DIR/index.md"

test "$(grep -c '^# Projects$' "$BUILD_DIR/projects/index.md")" -eq 1
test "$(grep -c '^# Contact$' "$BUILD_DIR/contact/index.md")" -eq 1
grep -Fq '# About Adler' "$BUILD_DIR/about/index.md"
if grep -Fxq '# About' "$BUILD_DIR/about/index.md"; then
  printf '%s\n' 'About markdown repeats the title.' >&2
  exit 1
fi
if grep -Fq 'page-updated' "$BUILD_DIR/now/index.md" "$BUILD_DIR/uses/index.md"; then
  printf '%s\n' 'Markdown date still contains HTML.' >&2
  exit 1
fi
grep -Fq 'Last updated:' "$BUILD_DIR/now/index.md"
grep -Fq 'Last updated:' "$BUILD_DIR/uses/index.md"
if grep -Fq '{{% projects' "$BUILD_DIR/projects/index.md" "$BUILD_DIR/now/index.md"; then
  printf '%s\n' 'Project shortcode was published raw.' >&2
  exit 1
fi

grep -Fq 'Também em português' "$BUILD_DIR/posts/say-cheese-catch-curious-eyes/index.html"
grep -Fq 'Also in English' "$BUILD_DIR/posts/say-cheese-proteja-se-contra-curiosos/index.html"
grep -Fq '[Também em português](' "$BUILD_DIR/posts/say-cheese-catch-curious-eyes/index.md"
grep -Fq '[Also in English](' "$BUILD_DIR/posts/say-cheese-proteja-se-contra-curiosos/index.md"
if grep -Fq 'post-translation' "$BUILD_DIR/posts/debugging-an-audacity-crash-on-windows/index.html"; then
  printf '%s\n' 'A post without a pair shows a translation link.' >&2
  exit 1
fi

grep -Fq 'Content-Signal: ai-train=no, search=yes, ai-input=yes' \
  "$BUILD_DIR/robots.txt"
grep -Fq 'rel=api-catalog' "$BUILD_DIR/index.html"
grep -Fq '/js/webmcp.js' "$BUILD_DIR/index.html"

node --check "$BUILD_DIR/js/webmcp.js"

printf '%s\n' "Agent discovery artifacts verified."
