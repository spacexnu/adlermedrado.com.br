#!/usr/bin/env sh
set -eu

HUGO_VERSION=0.167.0
ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
BIN_DIR="$ROOT_DIR/.tools/bin"

if [ -x "$BIN_DIR/hugo" ] && "$BIN_DIR/hugo" version | grep -Fq "v${HUGO_VERSION}-"; then
  "$BIN_DIR/hugo" version
  exit 0
fi

case "$(uname -s)" in
  Linux) platform=linux ;;
  Darwin) platform=darwin ;;
  *) printf '%s\n' 'Unsupported OS: use Linux, macOS, or WSL.' >&2; exit 1 ;;
esac
case "$(uname -m)" in
  x86_64|amd64) arch=amd64 ;;
  aarch64|arm64) arch=arm64 ;;
  *) printf '%s\n' 'Unsupported architecture: use amd64 or arm64.' >&2; exit 1 ;;
esac
if [ "$platform" = darwin ]; then arch=universal; fi

for command in curl tar; do
  command -v "$command" >/dev/null 2>&1 || { printf 'Required command: %s\n' "$command" >&2; exit 1; }
done
if command -v sha256sum >/dev/null 2>&1; then
  checksum=sha256sum
elif command -v shasum >/dev/null 2>&1; then
  checksum=shasum
else
  printf '%s\n' 'Install sha256sum or shasum to verify the download.' >&2
  exit 1
fi

WORK_DIR=$(mktemp -d "${TMPDIR:-/tmp}/adler-hugo.XXXXXX")
trap 'rm -rf "$WORK_DIR"' EXIT INT TERM
archive="hugo_${HUGO_VERSION}_${platform}-${arch}.tar.gz"
release="https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}"
curl -fSL --retry 3 "$release/$archive" -o "$WORK_DIR/$archive"
curl -fsSL --retry 3 "$release/hugo_${HUGO_VERSION}_checksums.txt" -o "$WORK_DIR/checksums.txt"
cd "$WORK_DIR"
awk -v archive="$archive" '$2 == archive { print; found=1 } END { if (!found) exit 1 }' checksums.txt > selected-checksum.txt
if [ "$checksum" = sha256sum ]; then
  sha256sum -c selected-checksum.txt
else
  shasum -a 256 -c selected-checksum.txt
fi
tar -xzf "$archive" hugo
mkdir -p "$BIN_DIR"
install -m 755 hugo "$BIN_DIR/hugo"
"$BIN_DIR/hugo" version
