#!/usr/bin/env bash
set -euo pipefail

# Generates ASCII-armored detached signatures (.asc) for site assets.
# Usage: ./clearsign_html.sh [target_directory]

TARGET_DIR="${1:-public}"
SIGNING_KEY="${GPG_SIGNING_KEY:-}"

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "Target directory '$TARGET_DIR' not found" >&2
  exit 1
fi

extensions=(
  html
  htm
  css
  js
  xml
  txt
  json
  webmanifest
  map
  svg
)

find_predicate=()
for ext in "${extensions[@]}"; do
  find_predicate+=( -name "*.${ext}" -o )
done
# Drop trailing -o
unset 'find_predicate[${#find_predicate[@]}-1]'

echo "Signing files in '$TARGET_DIR' and writing sidecar .asc signatures..."
find "$TARGET_DIR" -type f ! -name "*.asc" \( "${find_predicate[@]}" \) -print0 |
  while IFS= read -r -d '' file; do
    asc_file="${file}.asc"
    echo " - $file -> ${asc_file}"
    if [[ -n "$SIGNING_KEY" ]]; then
      gpg --batch --yes --armor --detach-sign --local-user "$SIGNING_KEY" --output "$asc_file" "$file"
    else
      gpg --batch --yes --armor --detach-sign --output "$asc_file" "$file"
    fi
  done
