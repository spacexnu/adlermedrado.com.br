#!/usr/bin/env bash

shopt -s globstar

# Signs an HTML file by appending a PGP signature.
# Args:
#   $1: Path to the HTML file to sign.
function sign_html {
  local html_file="$1"
  local temp_dir

  temp_dir=$(mktemp -d /tmp/pgp-html-XXXXXX)
  if [[ ! -d "$temp_dir" ]]; then
    echo "Failed to create temporary directory" >&2
    return 1
  fi

  echo "Copying file $html_file to $temp_dir in order to be signed"
  {
    echo '-->'
    cat "$html_file"
    echo '<!--'
  } > "$temp_dir/file.html"

  if [[ $? -ne 0 ]]; then
    echo "Failed to prepare file for signing" >&2
    rm -rf "$temp_dir"
    return 1
  fi

  echo "Signing $temp_dir/file.html and renaming to $html_file"
  {
    echo '<!--'
    gpg --clearsign --output - "$temp_dir/file.html"
    echo '-->'
  } > "$html_file"

  if [[ $? -ne 0 ]]; then
    echo "Failed to sign the file" >&2
    rm -rf "$temp_dir"
    return 1
  fi

  echo "Cleaning up temporary files..."
  rm -rf "$temp_dir"
}

# Process all HTML files in the public directory and its subdirectories.
for html_file in public/**/*.html; do
  sign_html "$html_file"
done
