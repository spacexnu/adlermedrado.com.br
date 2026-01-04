---
title: "Evolving HADES"
date: 2026-01-04T11:52:13-03:00
draft: false
tags: ["security", "fraud", "detection"]
---

This post describes how **HADES** evolved to detect fraudulent URLs **without relying on paid services**.  
The focus was to strengthen detection with **in-house code**, **local heuristics (PT/BR)**, and **open public sources**, while keeping full control of the pipeline.

> **Note:** the CNPJ used in the examples was changed to `11917932300169`.  
> The goal is to **illustrate the case**, not to expose real individuals or companies.

> **Note #2**: CNPJ is the Brazilian business tax ID, similar to the EIN in the U.S.

---

## 1) Initial problem: simple heuristics fail on local scams

HADES used simple rules: suspicious English words (`login/verify`), HTTP without TLS, IP in the URL, excessive subdomains, and recently registered domains.  
Those rules work for didactic examples, but fail with Brazilian scams.

**Real example that passed with score 0:**

```text
https://pagmei.regularizareimediato.com/11917932300169
```

**Reasons:**

- No "login/verify" words in English.
- HTML did not trigger heuristics.
- No rule captured CNPJ/CPF in the path.

The system was **blind** to the Brazilian scenario.

---

## 2) Local heuristics (PT/BR) + recurring scam patterns

### Improvements

- Separate PT and EN dictionaries (e.g., `pagamento`, `boleto`, `pix`, `cnpj`, `cpf`, `regulariza`).
- Detection of **long numeric path** (e.g., `/11917932300169`).
- Penalty for **long domains**, common in phishing (fake branding, multiple words, etc.).

### Benefits

- National scams do not use "verify/login" in English.
- CNPJ/CPF in the path is a standard pattern in billing scams.
- Long domains increase risk (attempt to look "official" via text).

### Example (before)

```bash
POST /analyze
Content-Type: application/json

{
  "urls": ["https://pagmei.regularizareimediato.com/11917932300169"]
}
```

Response:

```json
[
  {
    "url": "https://pagmei.regularizareimediato.com/11917932300169",
    "score": 0,
    "url_details": {
      "domain_length": 31,
      "url_length": 54,
      "has_suspicious_words": false,
      "num_subdomains": 1,
      "uses_ip_address": false,
      "uses_insecure_protocol": false,
      "domain_age_days": -1
    },
    "html_details": {
      "content_fetched": true,
      "has_suspicious_title": false,
      "has_phishing_keywords": false,
      "has_suspicious_forms": false,
      "has_external_redirects": false,
      "has_obfuscated_code": false,
      "missing_ssl_indicators": false,
      "html_score": 0
    },
    "final_score": 0
  }
]
```

### Example (after, local heuristics only)

Response (real example):

```json
[
  {
    "url": "https://pagmei.regularizareimediato.com/11917932300169",
    "score": 50,
    "url_details": {
      "domain_length": 31,
      "url_length": 54,
      "has_suspicious_words": true,
      "has_long_numeric_path": true,
      "in_feed_blocklist": false,
      "feed_match_type": "",
      "num_subdomains": 1,
      "uses_ip_address": false,
      "uses_insecure_protocol": false,
      "domain_age_days": -1
    },
    "html_details": {
      "content_fetched": true,
      "has_suspicious_title": false,
      "has_phishing_keywords": false,
      "has_suspicious_forms": false,
      "has_external_redirects": false,
      "has_obfuscated_code": false,
      "missing_ssl_indicators": false,
      "html_score": 0
    },
    "final_score": 20
  }
]
```

---

## 3) Dictionary in the database + moderation (the system learns without redeploy)

### What was done (dictionary in the database)

- Created the `suspicious_dictionary` table.
- Each term has a `status` (e.g., `approved`, `awaiting_moderation`).
- The code fetches words from the database.
- New terms from suspicious URLs are saved as **candidates** (`awaiting_moderation`).

### Why this helps (dictionary in the database)

- No need to rewrite code to adjust the dictionary.
- The system suggests new scam terms.
- The team decides what to approve, avoiding noise and false positives.

**Practical example:**

- The domain `regularizareimediato.com` yields tokens like `regulariza`, `imediato`.
- They go to review and can become official rules.

---

## 4) Local reputation with open blocklists (no cost, no signup)

Heuristics do not detect known malicious URLs. We need reputation without paid services.

### What was done (open blocklists)

- Created `feed_sources` and `feed_entries` tables.
- Ingestion pipeline to download open public lists (no signup):
  - Phishing.Database (ACTIVE + NEW - "today")
  - OpenPhish public feed (via GitHub)
  - Spam404
  - KADhosts
- Normalization and batch save.

### Why this helps (open blocklists)

- Known malicious URLs or domains receive **immediate high risk**.
- Lists cover real campaigns and are updated daily.
- No cost.

---

## 5) Score integration (blocklist becomes a strong signal)

### What was done (score integration)

- During analysis, the system queries the database:
  - Full URL (direct match)
  - Domain and subdomains
- A match sets:
  - `in_feed_blocklist = true`
  - `feed_match_type = url | domain`
- Adds **+200** to the score: high risk.

### Example (URL in blocklist)

```text
in_feed_blocklist: true
feed_match_type: url (or domain)
score >= 200
final_score high
```

### Why this helps (score integration)

- Score reflects fraud immediately.
- Avoids "false negatives" for URLs already known as scams.

---

## Operational pipeline: production without pain

### What was done (operational pipeline)

- `cmd/ingest` binary (runs once or in a loop).
- `ingest` service in Docker Compose (`INGEST_INTERVAL`).
- Makefile:
  - `make ingest`
  - `make ingest-loop`

### Example (local ingestion)

```bash
make migrate-up
make ingest
```

### Example (continuous ingestion via Docker)

```bash
docker compose up -d ingest
```

### Why this helps (operational pipeline)

- Automated pipeline.
- Independent of external installs.
- Control over the update interval.

---

## Before and after

**Before** (fraudulent URL passed):

```text
score: 0
has_suspicious_words: false
html_score: 0
```

**After** (local heuristics + blocklist):

```text
score > 0
has_suspicious_words: true
has_long_numeric_path: true
in_feed_blocklist: true (if the feed has the URL/domain)
```

---

## Next steps

- **Benign lists (top-1M):** reduce false positives.
- **Lightweight ML model:** logistic regression / random forest.
- **Advanced normalization:** punycode, homoglyphs.

---

HADES evolved from a simple model into a realistic detector, with a moderated dynamic dictionary, local heuristics (PT/BR), reputation based on public feeds, and an automated ingestion pipeline, still without relying on paid services.

If you are interested, the code is updated on [GitHub](https://github.com/spacexnu/hades).
