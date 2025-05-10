---
title: "Real-time Deepfakes: what if \"seeing is believing\" no longer means anything?"
date: 2025-05-10T11:19:13-03:00
draft: false
tags: ["ai", "deepfake", "cryptography", "gpg", "security"]
---

An open-source project called Deep-Live-Cam is gaining traction on GitHub — and for good reason.

With just a single still image, it can mimic anyone’s face in a live video call. In real-time. Running locally. No cloud required.

The implication is clear: you can no longer trust a video call at face value.

So here’s the question: **how do we verify identity in a world where faces can be forged on demand?**

While many react with fear or disbelief, I see only one viable answer: **digital signatures.**

For years, I’ve been saying: we should **encrypt everything** — files, messages, infrastructure. But now, that’s not enough.

**We need to start signing everything.**

Digital signatures ensure authenticity. They prove that something really came from who claims to have sent it — and hasn’t been tampered with.

We already sign emails, source code, and software packages.
**Why not apply the same principle to real-time streams?**

Imagine a video call cryptographically signed with the speaker’s GPG key.
Even if the face looks convincing, if the signature doesn’t verify, you know something’s off.

I sign every HTML page on my personal website with my GPG key. Not because I’m paranoid — but because **I believe security should be a mindset.**

**Don’t trust. Verify.**

