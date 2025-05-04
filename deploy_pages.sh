#!/usr/bin/env bash
set -euo pipefail

SITE_DIR=$(pwd)                 # raiz do repo Hugo
PAGES_PROJECT="adler-site"      # ↩️  muda se quiser
BUILD_DIR="$SITE_DIR/public"    # onde o Hugo joga o html

echo "🏗️  Building Hugo…"
hugo --minify

echo "✍️  Signing HTML…"
if command -v make &>/dev/null && make -qn clear-sign; then
  make clear-sign
elif [ -x ./clearsign_html.sh ]; then
  ./clearsign_html.sh "$BUILD_DIR"
else
  echo "‼️  No Makefile or clearsign_html.sh has been found."
  exit 1
fi

echo "🚀  Uploading to Cloudflare Pages…"
wrangler pages deploy "$BUILD_DIR" \
  --project-name "$PAGES_PROJECT" \
  --branch master

echo "✅  Done!"
