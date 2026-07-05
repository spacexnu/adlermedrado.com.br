---
title: "SovereignRAG 1.0.0: Offline, Git-Aware Security Code Auditing"
date: 2026-07-05
tags: [security, rag, llm, ollama, offline, devsecops]
description: "A fully offline RAG pipeline for auditing source code against security references, now with Git-aware analysis, cited findings, and a host-Ollama workflow."
languages: ["english"]
draft: false
---

I've been building **SovereignRAG**, my fully offline RAG pipeline for security code auditing. It just reached `1.0.0`.

This release is not just a version bump. It adds Git-aware analysis, Markdown ingestion, cited findings, better Ollama workflows, and a proper documentation site. It also includes a troubleshooting guide born from real pain, because nothing documents a feature better than watching it fail in your face.

## What SovereignRAG is

SovereignRAG ingests security reference documents, such as OWASP guides, cheat sheets, and internal standards, into a local vector database. Then it analyzes source files against that knowledge using a local LLM served by [Ollama](https://ollama.com).

No cloud. No external API calls. No sending private code to somebody else's server.

Your code stays local. Your references stay local. The model runs on hardware you control.

The pipeline has two main phases, both using the same ChromaDB collection:

1. **Ingest**: `.pdf` and `.md` files are cleaned, segmented with spaCy, chunked with overlap, embedded with a SentenceTransformer, and stored in ChromaDB.
2. **Query**: for each source file, SovereignRAG retrieves the most relevant reference chunks and sends them to an Ollama model together with the code. The model reports possible vulnerabilities with a description, a suggested fix, and the reference document behind the finding.

Everything runs through a Docker-first Makefile, so a full audit is basically a few `make` commands.

## What's new in 1.0.0

### Git-aware analysis: review only what changed

Auditing an entire codebase on every commit sounds nice until you actually try to use it. It is too slow for a real workflow.

So `1.0.0` adds changed file analysis. SovereignRAG can now ask Git what changed and review only those files.

```bash
# Everything different from HEAD, including untracked files
make query QUERY_PATH=./src EXT=py CHANGED_ONLY=1 MODEL=qwen2.5-coder:7b

# Only staged files, useful for a pre-commit hook
make query QUERY_PATH=./src EXT=py STAGED=1 MODEL=qwen2.5-coder:7b

# Everything changed against a remote base, useful before pushing
make query QUERY_PATH=./src EXT=py CHANGED_BASE=origin/master MODEL=qwen2.5-coder:7b
```

The staged variant is the one I care about most. Drop it into `.git/hooks/pre-commit` and every commit gets a focused security pass over the files you actually touched.

That is the difference between a tool you run once for a demo and a tool you can keep enabled.

### Audit any repository, not only SovereignRAG itself

The query phase can now audit external repositories too.

You can point SovereignRAG at another project's working tree and run changed file analysis against that repository's Git history.

```bash
make query QUERY_PATH=/path/to/other/project EXT=py CHANGED_ONLY=1 MODEL=qwen2.5-coder:7b HOST_OLLAMA=1
```

This matters because the tool should not be trapped inside its own repository. If it can only audit itself, it is a toy.

The changed file logic now runs inside the production `app` container with the host working tree and `.git` directory mounted in. That means Git can correctly detect committed, uncommitted, staged, and untracked changes from inside Docker.

### Markdown ingestion with cited findings

Most current OWASP references are available as Markdown, so SovereignRAG now ingests `.md` files natively.

During ingestion it strips code fences, headings, links, and emphasis before segmentation. PDF ingestion still works through PyMuPDF.

More importantly, each chunk now carries its source document in metadata. That means findings can point back to the document they came from.

A finding you cannot cite is just noise.

Security tooling needs traceability. If a model says something is vulnerable, I want to know what reference pushed it in that direction. Don't trust magic output. Verify the source.

### Use the Ollama you already have with `HOST_OLLAMA`

If you already run Ollama natively, starting another Ollama service through Docker Compose is just asking for a port conflict.

The new `HOST_OLLAMA=1` switch skips the Compose `ollama` service and talks to the Ollama instance running on the host machine.

```bash
make query QUERY_PATH=./src EXT=py MODEL=qwen2.5-coder:7b HOST_OLLAMA=1
```

Under the hood, the Makefile uses `--no-deps` and points the container to:

```text
http://host.docker.internal:11434
```

It also uses a `host-gateway` mapping so the container can reach the host properly.

The practical benefit is simple: if you already pulled your models locally, SovereignRAG reuses them instead of creating another moving part.

### A real documentation site

The project now has a full [MkDocs](https://www.mkdocs.org) documentation site using the Material theme.

It includes:

- getting started guide
- user guide
- command reference
- development notes
- troubleshooting guide

The docs are published automatically to GitHub Pages on every push.

Documentation living next to the code is not perfect, but it is better than a forgotten README slowly rotting in the corner.

## The war story that became a troubleshooting guide

The `HOST_OLLAMA` feature looked done until I actually tried to use it against a native Ollama install.

Then it failed twice.

That was annoying, but useful. The failures became a troubleshooting page.

### Failure 1: port already in use

```text
failed to bind host port 0.0.0.0:11434/tcp: address already in use
```

That is exactly the problem `HOST_OLLAMA=1` exists to solve.

Native Ollama already owns port `11434`, so Docker should not try to start another Ollama container. It should reuse the one already running.

There is also a small footgun here: the Make variable is `HOST_OLLAMA`, not `OLLAMA_HOST`.

If you pass the wrong name, nothing useful happens. Docker still tries to start the Compose service and you are back in port conflict hell.

### Failure 2: connection refused, even with the right URL

```text
Failed to connect to Ollama. Please check that Ollama is downloaded, running and accessible.
```

The URL was correct. The container could resolve the host. But it still could not connect.

The culprit was this:

```bash
ss -tlnp | grep 11434
# LISTEN 127.0.0.1:11434
```

Native Ollama binds to `127.0.0.1` by default. That works from the host itself, but not from a Docker container reaching the host through the gateway IP.

The fix is to make Ollama listen on all interfaces.

For a systemd install:

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
printf '[Service]\nEnvironment="OLLAMA_HOST=0.0.0.0:11434"\n' \
  | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

Then confirm it changed:

```bash
ss -tlnp | grep 11434
```

You want to see `0.0.0.0:11434`.

That whole sequence now lives in the docs, together with notes about VRAM limits, `NUM_CTX`, old chunks showing `unknown source`, and embedding model mismatches.

Nobody should have to rediscover the same stupid problem twice.

## A note on VRAM

A query sends the source file plus retrieved context into the prompt. Large files can push the context too far, blow past GPU VRAM, and force a slow CPU offload.

`NUM_CTX` lets you cap the context window so the KV cache fits in VRAM.

```bash
make query QUERY_PATH=./src EXT=py MODEL=qwen2.5-coder:7b NUM_CTX=8192
```

Check the result with:

```bash
ollama ps
```

You want to see `100% GPU`.

If you are offloading to CPU, the tool will still work, but it will feel like compiling Gentoo on a toaster.

## Try it

```bash
make build
make pull-model MODEL=qwen2.5-coder:7b
make ingest DOCS_DIR=./raw_pdfs MODEL=all-MiniLM-L6-v2
make query QUERY_PATH=./src EXT=py MODEL=qwen2.5-coder:7b
```

The full documentation, including the new troubleshooting guide, is published here:

[spacexnu.github.io/sovereign-rag](https://spacexnu.github.io/sovereign-rag/)
