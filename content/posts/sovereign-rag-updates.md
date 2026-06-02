---
title: "SovereignRAG Updates"
date: 2026-06-01T21:53:00-03:00
languages: ["english"]
draft: false
tags:
  - ai
  - security
  - auditing
  - llm
  - rag
---

Yesterday I made a batch of changes to [SovereignRAG](https://adlermedrado.com.br/posts/sovereign-rag/) that I had been putting off for a while: Markdown support in the ingestion pipeline and mandatory source citations in the reports.

The practical problem was straightforward. A significant portion of OWASP documentation doesn't come as PDF — it comes as Markdown. Without `.md` support, I was leaving out of context exactly the docs that matter most in a vulnerability scanner. Now the project recursively discovers both PDFs and Markdown files inside any directory passed via `--docs-dir`, no need to list files individually.

But ingesting raw Markdown has a side effect: code fences, headings, links, emphasis markers — all of that becomes noise during chunking. So before splitting the text into pieces, the pipeline strips the markup. The semantic content goes in clean. Each chunk still carries the source metadata (`source: <filename>`), so the system knows where each passage came from even after vectorization.

That metadata became the backbone of the other change: mandatory citations in reports. Every reported vulnerability now must include a description, a suggested fix, and the source document it came from — tagged with the prefix `[Source: <document>]`. No source, no report. This addresses a classic RAG problem: the polished answer that tells you nothing about where it came from.

Sources also show up in the HTML report, via `html_report.py`. No more invisible output buried in a terminal log — the reference document is visible to whoever is reading the report.

Finally, I added a `--num-ctx` flag on the Ollama side to control context size and KV cache. Anyone running large models on a GPU with limited VRAM will notice the difference — you can tune `num_ctx` without touching model configs directly.

The changes touched 10 files in total. The heaviest diffs were in `ingest.py` (+145 lines) and `query.py` (+44 lines), along with `cli.py`. Makefile, `docker-compose.yml`, README, and the test suite (`test_ingest.py`, `test_query.py`, `test_html_report.py`) were also updated.