---
title: "Technical Sovereignty: Can You Actually Leave Your Cloud Provider?"
date: "2026-10-01T13:36:31+00:00"
languages: ["english"]
draft: false
categories: ["Security", "Sovereign"]
description: "Test your cloud exit plan with a practical recovery checklist covering backups, exports, identity, WordPress media, and local AI dependencies."
aliases: ["/blog/technical-sovereignty-cloud-provider-exit-test/"]
images: ["/posts/images/technical-sovereignty-cloud-exit.jpg"]
---

![Illustration of data moving from a cloud to an independently controlled server and backup drives.](/posts/images/technical-sovereignty-cloud-exit.jpg)

You have backups. You have an export button. You might even run open-source software. Can you rebuild the service somewhere else when the current provider becomes unavailable?

That is a useful test of technical sovereignty: **can you leave, recover your data, and keep the important workflow running?** A migration plan becomes credible when someone executes it.

The earlier article on [why technical sovereignty matters](https://adlermedrado.com.br/posts/why-technical-sovereignty-matters-in-2026/) established the principle. This guide turns it into a small, controlled exercise you can apply to a blog, a document service, or an internal application.

## Start with one workflow and a clear recovery target

Choose a service with consequences you can explain: publishing your website, retrieving project documentation, or processing a support request. Define what must work after recovery. “The server starts” is weaker than “an editor can sign in, open an existing article, and preview its images.”

Set two targets: how long you can tolerate the service being unavailable, and how much recent data you can afford to lose. These are commonly called the recovery time objective (RTO) and recovery point objective (RPO). For a personal blog, a day of downtime might be acceptable. For a transaction system, the same assumption could be disastrous. Choose targets from the workflow, rather than copying another organization's numbers.

[NIST's contingency planning guide, SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final), provides a formal foundation for evaluating recovery priorities. The exercise below is an editorial adaptation for a smaller stack, not a compliance assessment.

## Map the dependencies that could prevent your exit

Write down what the service needs beyond its database. Include uploaded files, software versions, extensions, scheduled tasks, external APIs, DNS control, identity providers, and encryption keys. For each item, record who controls it and how you would replace or recover it.

Look for circular dependencies. If your recovery instructions are inside the unavailable service, they will not help. If your only administrator signs in through an identity provider you are trying to leave, a copied database will not restore access.

Keep recovery credentials and instructions in a protected location you can reach independently. Treat secrets separately from ordinary configuration: document how to retrieve them securely, rather than pasting them into a public repository.

## Separate a content export from a complete backup

An export is useful when another application can interpret it. A backup is useful when you can restore the required system state. Depending on the application, you may need both.

WordPress offers a concrete example. Its [Tools → Export documentation](https://wordpress.org/documentation/article/tools-export-screen/) describes a WXR XML file containing content such as posts, pages, comments, custom fields, categories, and tags. That content export should not be treated as a complete copy of the running site.

For a full recovery exercise, account for the database and the files needed by your installation, including uploads, themes, plugins, and relevant configuration. An attachment reference in exported content is not an independent copy of the image. Check that your media survives even when the original host cannot serve it.

Store a recoverable copy outside the same account or failure boundary as the production service. Protect that copy according to the sensitivity of its contents. A downloadable archive with exposed credentials creates another problem.

## Restore into an isolated environment

Build a separate test instance. Do not interrupt the live site to prove a philosophical point.

Prevent the restored environment from sending real email, charging customers, running production webhooks, or processing live jobs. Use replacement secrets where possible. Keep the test instance private and prevent indexing if it contains a copy of public content.

Follow the written instructions using the backup or export you actually have. Record missing files, undocumented steps, unavailable packages, and anything that still calls the old provider. A successful exercise depends on reproducible instructions, not on one person remembering a workaround.

## Verify the workflow, not just the login screen

Run a short acceptance checklist:

- Can the intended user sign in without depending on the unavailable provider?

- Are expected records present, including a recent sample?

- Do images and attachments open from the recovered environment?

- Do internal links and essential integrations behave correctly?

- Can the application perform its core task with test data?

- Can you identify what changed since the backup and what remains missing?

Measure the elapsed recovery time and the age of the recovered data. Compare those results with your targets. If the service comes back quickly but loses a week of essential work, the test has exposed a real gap.

## Open source and local AI still need an exit plan

Access to source code gives you options, but operating a replacement also requires skills, dependencies, configuration, and time. A self-hosted application can become difficult to leave when custom extensions and undocumented procedures accumulate.

The same question applies to a [local-first AI stack](https://adlermedrado.com.br/posts/building-a-local-first-ai-stack-on-mac-m-series/). Record the model artifact and its license, runtime version, prompts, retrieval sources, and preprocessing steps. Confirm that you can obtain and use the required artifacts under their applicable terms.

Moving an AI workflow to another model also requires evaluation. A replacement may accept the same request format and still produce different answers. Keep a small set of representative inputs and explicit criteria for acceptable results. Portability includes behavior as well as files.

## Keep a small exit record

For each critical service, maintain one page with its owner, recovery targets, backup location, export format, restore procedure, dependencies, last test date, and unresolved failures. Record the time and cost of the latest exercise.

Repeat the test after major changes and on a schedule appropriate to the service. Fix the most consequential failure first: missing media, inaccessible recovery credentials, or an integration that cannot run elsewhere.

Technical sovereignty becomes practical when you can demonstrate the exit. Start with one workflow. Restore it somewhere safe. Record what broke. Then improve the plan until leaving is a workable option.
