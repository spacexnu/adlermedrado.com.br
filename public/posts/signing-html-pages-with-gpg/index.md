---
title: "Signing HTML Pages with GPG"
description: "A few months ago I rebuilt this site. I was using WordPress and wasn’t very happy with it, so I decided to use a static site generator, in this case Hugo.\nIn the past I’ve used Pelican, Jekyll and Dangolino, the last one being a tool I built myself but discontinued after a while. If I’m not mistaken, there are posts here talking about them.\nWhy sign the pages? I see cryptography as a defense mechanism. I believe people should encrypt everything, to try to guarantee security, privacy and authenticity, among other things.\n"
url: "https://adlermedrado.com.br/posts/signing-html-pages-with-gpg/"
date: "2024-01-07T11:44:54-03:00"
---

# Signing HTML Pages with GPG


A few months ago I rebuilt this site. I was using WordPress and wasn't very
happy with it, so I decided to use a static site generator, in this case [Hugo](https://gohugo.io).

In the past I've used [Pelican](https://getpelican.com), [Jekyll](https://jekyllrb.com) and Dangolino,
the last one being a tool I built myself but discontinued after a while.
If I'm not mistaken, there are posts here talking about them.

## Why sign the pages?

I see cryptography as a defense mechanism. I believe people should
encrypt everything, to try to guarantee security, privacy and authenticity, among other things.

In this specific case, when I decided to restructure this site I thought about guaranteeing that
the content published here was in fact produced by me. That would prevent a situation
where someone with improper access to my server altered content posted here and
compromised me in some way.

That was one point, but these days, with the amount of fake news published on the internet,
as well as the indiscriminate use of AI, it's hard to know what is trustworthy or not,
and I want at least what I post to be easily identified as legitimate.

## Doing this on my site, will it change anything?

On its own it won't change anything, but imagine if everyone who published
something on their sites did this? That would change something, right?

Using GPG/PGP isn't trivial, but it isn't rocket science either.
There are posts here where I've covered the subject. They're a few years old and may be
outdated, but they work as a starting point if you're just now starting to study the topic.

## How a GPG signature works

[GPG](https://www.gnupg.org), or GNU Privacy Guard, is a free implementation of
[OpenPGP](https://www.openpgp.org), a standard for encryption, decryption,
signing, etc., based on PGP, developed by Phil Zimmermann.

Basically GPG is a software suite that lets you manage cryptographic keys and
encrypt and decrypt using the keys it manages.

When a person creates a key pair, they can share the public key with other people,
who in turn also share theirs, and when there's a trust relationship between them,
their keys can be mutually signed, which demonstrates to third parties that the keys are legitimate.

My public key is available [here](/pub-key.asc) as well as on the
[OpenPGP server](https://keys.openpgp.org/search?q=FF676DC52A0191C3).

Back to the point...

In the case of the signatures on my site's HTML pages, anyone can verify
whether they're signed with my key or not. In the latter case, the content isn't legitimate.

## Sign the file itself or use a separate file?

My site's files are signed inside the HTML itself, but the signature could
be in a separate file.

In a separate file, it would be something like this: the address https://site.com/index.html
would have a corresponding file at https://site.com/index.asc,
whose content is the cryptographic signature of the index.html file.

I chose to keep it in the same file to make
the validation process easier, but both ways are valid.

If you're curious to see what the file with the embedded signature looks like, use
your browser's _View Page Source_ feature.

## How do you validate the integrity of the signed file?

First my public key must be imported into your key manager (GPG Suite, for example),
then you just download the HTML file and use GPG's _verify_ command to check integrity.

To validate the HTML file of my site's home page, just run the following command in your terminal:

```bash
curl https://adlermedrado.com.br/ | gpg --verify
```
Result:

```bash
curl https://adlermedrado.com.br/ | gpg --verify
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7413    0  7413    0     0   7803      0 --:--:-- --:--:-- --:--:--  7803
gpg: Signature made Dom 31 Dez 13:19:04 2023 -03
gpg:                using RSA key 39A90E7D803B5C02D3EFEBA7FF676DC52A0191C3
gpg: Good signature from "Adler Medrado <adler@adlermedrado.com.br>" [ultimate]
```
To show what would happen if the file's content were modified, I
made a change and asked it to verify again. The result:

```bash
curl https://adlermedrado.com.br/ | gpg --verify
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7423    0  7423    0     0   7813      0 --:--:-- --:--:-- --:--:--  7813
gpg: Signature made Dom 31 Dez 13:19:04 2023 -03
gpg:                using RSA key 39A90E7D803B5C02D3EFEBA7FF676DC52A0191C3
gpg: BAD signature from "Adler Medrado <adler@adlermedrado.com.br>" [ultimate]
```
This result indicates that the file was modified, meaning it isn't intact
according to the signature contained in it.

## How to sign the files

As I mentioned earlier, I'm using Hugo to generate the site's static
files, and Hugo has a specific command for that. Since there are several commands
used in this process, I put them all in a Makefile because my memory
is terrible.

```Makefile
help:
	@echo "targets:"
	@echo "serve: Run a local hugo development server"
	@echo "build: Build the minified version of the site"
	@echo "clear-sign: PGP Clearsign all HTML pages of the site"
	@echo "deploy: Deploy files to server"
	@echo "help: Show this help"

serve:
	hugo server -D

build:
	hugo --gc --minify

clear-sign:
	./clearsign_html.sh

deploy:
	rsync -rvhe ssh --progress --delete ./public/ host:dir

.PHONY: serve build signature
```
After writing a new post, I use the _build_ command to convert the markdown
files into HTML, then I use the _clear-sign_ command to sign each
file individually, and then I update the server with the new files
using the _deploy_ command.

To produce the signatures, I created a small bash script that is executed
for each file:

```bash
#!/usr/bin/env bash

shopt -s globstar

function sign_html {
  html=$1
  temp=/tmp/pgp-html-$$

  echo "Copying file $1 to $temp in order to be signed"
  (
    echo '-->'
    cat "$html"
    echo '<!--'
  ) >$temp

  echo "Signing $temp and renaming to $html"
  (
    echo '<!--'
    gpg --clearsign --default-key YOUR_KEY --output - $temp
    echo '-->'
  ) >"$html"

  echo "Cleaning the garbage..."
  rm $temp
}

for i in public/**/*.html; do
  sign_html "$i"
done

```
## If you don't use it, consider giving it some thought

Managing keys isn't trivial. You need to study and understand the tool and the concepts,
which is why most people only use cryptography in cases they consider important.

That's why I find projects like [Keybase](https://keybase.io) interesting,
since they make key management easier and promote the use of cryptography.

If you've never used GPG, I suggest starting there.

## And from here on?

I've covered only a single point related to cryptography. This universe is
vast and I learn new things daily, and if you have the time and interest in the subject,
you'll come across very interesting topics such as Bitcoin (cryptocurrencies in general)
and the [Nostr](https://nostr.com) protocol, for example.

Have fun. I hope that little by little people come to understand more about the
importance of this topic and reach the same conclusion I did:
**Cryptography is our defense. Encrypt everything you can.**

