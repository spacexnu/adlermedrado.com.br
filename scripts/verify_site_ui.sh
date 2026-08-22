#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
BUILD_DIR=$(mktemp -d "${TMPDIR:-/tmp}/adler-site-ui.XXXXXX")
BUILD_LOG=$(mktemp "${TMPDIR:-/tmp}/adler-site-ui-build.XXXXXX")
trap 'rm -rf "$BUILD_DIR" "$BUILD_LOG"' EXIT INT TERM

cd "$ROOT_DIR"

if ! hugo --logLevel info --gc --minify \
  --destination "$BUILD_DIR" \
  --cleanDestinationDir >"$BUILD_LOG" 2>&1
then
  sed -n '1,240p' "$BUILD_LOG"
  exit 1
fi

if rg -n 'deprecated' "$BUILD_LOG"
then
  exit 1
fi

node "$ROOT_DIR/scripts/verify_site_ui.mjs" "$BUILD_DIR"

for script in theme-toggle.js mobile-navigation.js taglines.js webmcp.js
do
  node --check "$BUILD_DIR/js/$script"
done

if rg -n 'text-[0-9]|font-(bold|semibold)|mb-[0-9]|text-gray|style=' \
  layouts/posts layouts/missives layouts/languages layouts/taxonomy \
  layouts/_default/taxonomy.html
then
  exit 1
fi

if rg -n 'Roboto Mono|@font-face|fonts\.googleapis|fonts\.gstatic' \
  static/css layouts
then
  exit 1
fi

printf '%s\n' "Site UI contracts verified."
