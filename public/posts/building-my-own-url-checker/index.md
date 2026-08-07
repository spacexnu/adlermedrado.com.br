---
title: "I'm Going to Build My Own URL Checker"
description: "After testing several URL checking APIs and services, I decided to build my own engine exclusively for FraudTalon — fast, independent, and tuned to the reality of digital scams."
url: "https://adlermedrado.com.br/posts/building-my-own-url-checker/"
date: "2025-07-20T18:05:08-03:00"
---

# I'm Going to Build My Own URL Checker


Over the last few days I dove deep into a question that had been bothering me for a while: validating suspicious URLs in the context of digital fraud.

[FraudTalon](https://fraudtalon.com) already handles text, images, and emails. The idea is simple: extract any URL contained in that content and check whether it shows signs of being malicious. It sounds simple, but once you start testing the services available on the market, it gets a lot deeper than that.

I tried several options: Google Safe Browsing, URLScan, PhishTank, OpenPhish… and the result was frustrating. Many have severe limitations — restricted usage, poor coverage, APIs that block closed-source projects, impractical pricing (some starting at 500 dollars a month!). And even the free ones fail badly at basic detections. Safe Browsing itself, for example, only detects what is already widely known. If the scam URL is new, it will tell you everything is fine. Useless.

Given that, I decided something important: **I'm going to develop my own URL analysis engine**, tailor-made for FraudTalon.

This new engine will be able to identify classic scam signals:

* Fake login pages
* Disguised domains (like g00gle.com)
* Code obfuscation
* Embedded malicious scripts
* Phishing and scam patterns known in the security field

The idea is to make this analysis **fast, efficient, and free of third-party dependencies**. A closed project, maintained by me, focused on **performance** and **total autonomy**. If it becomes viable in the future, I might even explore some machine learning model to reinforce detection, training it with public data.

Worth reinforcing: **FraudTalon is not open source**. At least not for now. Not because I don't believe in free software, but because this project **needs to sustain itself**. The cost of keeping it running is high — it involves artificial intelligence, servers, infrastructure. If I open it up completely and people start using it en masse, I simply won't be able to foot the bill. And shutting the project down for lack of money would be worse.

All of this was born from a personal pain. Whenever someone sent me a suspicious email or ad, asking "is this a scam?", I thought: man, why hasn't anyone built a tool that answers this reliably? Now I'm building that tool.

I started out to help my friends and family, but I'm seeing that this could turn into something bigger. A product that generates real value, both for ordinary people and for companies. And if it becomes a real product that sustains itself, even better — I'll be able to keep developing it, maintaining quality and independence.

That's why I'm splitting this URL verification module off as a new internal project, which will be used by FraudTalon but can grow in a more specialized way. I'm still defining priorities, but I've already started the skeleton.

I'll run both projects in parallel. Even with little free time — work, family, life doesn't stop — progress is happening. Next week I should have more news. And yes, I promised to open up access for more people to test, but I'll confess: I keep postponing it because I want it to be polished first. I need to break out of that perfectionism. Better to ship it and iterate.

If you want to follow the progress, subscribe to the YouTube channel and leave a comment there. It helps a lot to give the project visibility and maybe even make this whole thing financially viable.

[This is the video where I talk about this topic
](https://youtu.be/_rJpERYysYk).

Thanks for following along.

**Libertas Invicta**.

