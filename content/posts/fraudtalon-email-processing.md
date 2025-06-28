---
title: "Update: Email (.eml) Analysis with FraudTalon"
date: 2025-06-28T15:46:07-03:00
draft: false
tags: [ fraudtalon, ai, security, fraud ]
---

### FraudTalon just took another important step.

I’m only able to work on FraudTalon a few hours per week, but I’m committed to making steady progress and sharing weekly updates.0

Starting today, you can upload `.eml` files directly through the interface, and the system will run a complete analysis
using a combination of email security heuristics and artificial intelligence.

<img alt="fraudtalon-banner" height="50%" src="/posts/images/fraudtalon-banner.png" width="50%"/>

The pipeline now works like this:

- Automatic `.eml` parsing with extraction of headers, sender, recipient, subject, and body
- Heuristic evaluation with signals such as:
    - Mismatch between From, Reply-To, and Return-Path
    - Authentication failures (DKIM, SPF, DMARC)
    - Relaying through unknown servers
- AI analysis (via OpenAI) that takes into account the full textual content
- Final score with a breakdown of suspicious indicators

This update makes [FraudTalon](https://fraudtalon.com) a much more powerful tool for analyzing suspicious emails like
phishing, Pix scams, or fake investment offers.

Next priorities:

1. URL validation using public scam databases
2. QR Code decoding and fraud detection
3. Full explainability: show why something was flagged as fraud

I'm committed to publishing regular updates on the evolution of the project.

Enjoyed this update? There's more coming soon. Follow along here or connect with me
on [LinkedIn](https://linkedin.com/in/adlermedrado).
