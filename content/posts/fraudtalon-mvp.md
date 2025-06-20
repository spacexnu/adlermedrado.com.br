---
title: "Fighting online fraud with FraudTalon"
date: 2025-06-20T11:24:49-03:00
draft: false
tags: [ai, fraud, security]
---

After getting so many messages from my parents, wife, sister, and friends asking if emails or ads they saw on social media were legit, I decided to build a tool to help identify fraud, scams, and phishing attempts.

That’s how **FraudTalon** was born.

It’s currently in MVP version **0.0.1** — basic functionality, simple heuristics (I started with NLP but dropped it — not needed for now), and a single cloud-based LLM. The goal at this stage is to validate the idea.

I built it using tools I know well: **Python, Django, PostgreSQL, Celery**, and **OpenAI**. But I want this to grow into a **multi-LLM platform**. I’m not interested in depending on black-box, closed, expensive services hosted in someone else's cloud. I wrote more about this mindset in my [SovereignRAG project](https://adlermedrado.com.br/posts/sovereign-rag/).

No no-code/low-code, no n8n-style flows. Didn’t need them. And yeah, I’ve got some bias against no-code — I’m an old-school dev — just like I had bias against AI a year ago. Things change.

### Roadmap
- Upload and analysis of `.eml` files  
- URL validation through external sources like SpamHaus  
- Phone number checks  
- QR code inspection  

Right now, you can paste the raw body of an email and get an instant risk analysis. But that’s just the beginning.

This is a tool for devs, security people, curious minds, and anyone who’s ever seen someone fall for a scam.

Let’s make the internet a little less dangerous.  
**One analysis at a time.**

[Watch the youtube video](https://youtu.be/U_8blKG9iCU) (pt_BR only, sorry):

