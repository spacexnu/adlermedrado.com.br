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

grep -Fq 'Content-Signal: ai-train=no, search=yes, ai-input=yes' \
  "$BUILD_DIR/robots.txt"
grep -Fq 'rel=api-catalog' "$BUILD_DIR/index.html"
grep -Fq '/js/webmcp.js' "$BUILD_DIR/index.html"

node --check "$BUILD_DIR/js/webmcp.js"

printf '%s\n' "Agent discovery artifacts verified."
