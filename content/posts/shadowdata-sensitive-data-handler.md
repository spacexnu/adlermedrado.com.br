---
title: "Shadowdata Sensitive Data Handler Python Library"
date: 2024-10-12T21:23:34-03:00
draft: false
---

I am deeply concerned about how to handle sensitive data in the projects I work on. Nowadays, there are laws in various countries addressing this issue, and the topic becomes increasingly important as time goes on.

Therefore, I decided to create a Python library that can help me deal with scenarios where it is necessary to process data to prevent any individual from being identified if the information is accessed. The library also handles data transformations, encryption, and the detection of sensitive personal data.

Today, I released the first minimally usable version. There’s still a lot of work ahead, but the project is already taking shape.

Currently, it can:

* Anonymize Brazilian personal data (CPF, CNPJ)
* Anonymize U.S. Social Security Numbers (SSN)
* Anonymize IPv4 and transform text more easily through substitutions
* Detect Sensitive Personal Information (PII) using a Natural Language Processing (NLP) tool

In the coming days, I will add a few more basic features and continue to update the project regularly.

If you’re interested in checking out the tool, it can be found on [Github](https://github.com/adlermedrado/ShadowData). I’d be delighted to receive feedback and suggestions, and of course, code contributions are welcome.

That’s all for now.

See you soon.
