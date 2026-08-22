#!/usr/bin/env bash
set -euo pipefail

SITE_DIR=$(pwd)
PAGES_PROJECT="adler-site"
BUILD_DIR="$SITE_DIR/public"
CURRENT_DATETIME=$(LANG=en_US.UTF-8 date)
echo "🏗️  Building Hugo..."
hugo --minify

echo "✍️  Signing build artifacts..."
if command -v make &>/dev/null && make -qn clear-sign; then
  make clear-sign
elif [ -x ./clearsign_html.sh ]; then
  ./clearsign_html.sh "$BUILD_DIR"
else
  echo "‼️  No Makefile or clearsign_html.sh has been found."
  exit 1
fi

echo "📟  Commit and push changes..."
git add content/*
git add -p
git commit -m "Site update at $CURRENT_DATETIME"
git push

echo "🚀  Uploading to Cloudflare Pages…"
wrangler pages deploy "$BUILD_DIR" \
  --project-name "$PAGES_PROJECT" \
  --branch master

echo "✅  Done!"
