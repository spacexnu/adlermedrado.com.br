#!/usr/bin/env bash

# Signs an HTML file by appending a PGP signature.
# Args:
#   $1: Path to the HTML file to sign.
function sign_html {
  local html_file="$1"
  local temp_file

  temp_file=$(mktemp /tmp/pgp-html-XXXXXX.html)
  if [[ ! -f "$temp_file" ]]; then
    echo "Failed to create temporary file" >&2
    return 1
  fi

  echo "Preparing file $html_file for signing"
  {
    echo '-->'
    cat "$html_file"
    echo '<!--'
  } >"$temp_file"

  if [[ $? -ne 0 ]]; then
    echo "Failed to prepare file for signing" >&2
    rm -f "$temp_file"
    return 1
  fi

  echo "Signing $temp_file and updating $html_file"
  {
    echo '<!--'
    gpg --clearsign --output - "$temp_file"
    echo '-->'
  } >"$html_file"

  if [[ $? -ne 0 ]]; then
    echo "Failed to sign the file" >&2
    rm -f "$temp_file"
    return 1
  fi

  echo "Cleaning up temporary file..."
  rm -f "$temp_file"
}

# Process all HTML files in the public directory and its subdirectories.
find public -type f -name "*.html" | while IFS= read -r html_file; do
  sign_html "$html_file"
done

