---
title: "Pinga: my small tool for HTTP requests"
date: 2026-01-09T18:32:00-03:00
draft: false
tags:
  - cli
  - tools
  - opensource
---

It’s been a while since I felt this good using a tool.

At work, people use Postman for almost everything, and I ended up using it too, even though it always felt like overkill for something as simple as integration tests with API calls.

I know Postman has a ton of features. The problem is that I never needed most of them. For me, it felt like using a cannon to kill a mosquito.

## Motivation

One day, while working on some integrations, I decided to take a break from Postman and go straight to the point: bash scripts calling `curl`. It worked immediately. But it didn’t take long to realize I was repeating too much code, with no real organization, and that it wouldn’t scale. It was functional, but far from elegant or sustainable.

That’s when the idea hit me:

**“Why not build a small, focused tool, exactly the way I need it?”**

I chose to write it in **C** because I hadn’t touched the language in years. I was rusty. And it felt like the perfect opportunity to solve a real problem while also shaking off the rust from a fundamental language, one that forces you to think, not just stack abstractions.

The idea was always clear: no reinventing Postman.  
No graphical interface, no collections, no workspaces, no cloud sync, no accounts, no login, no fluff. I just wanted a simple, fast, and predictable tool to fire HTTP requests, using JSON files to define them.

And that’s how [pinga](https://github.com/spacexnu/pinga) was born.

A command-line utility, written in C, that reads a JSON file, executes the defined HTTP request, and outputs the response directly. Perfect for scripts, pipelines, integration tests, or simply using it in the terminal, combined with tools like `jq`.

## Why the name “pinga”?

In Brazilian Portuguese, *pinga* is slang for **cachaça**, a strong and traditional sugarcane spirit. The name reflects the spirit of the tool itself: small, direct, and unapologetically simple.

And honestly? I’d rather drink liters of cachaça and deal with a brutal hangover the next day than open a huge, bloated tool just to make a single HTTP request.

This project was never meant to compete with massive tools. It was built to give me back control, simplicity, and focus. If someone else finds it useful along the way, great. But the original motivation has always been the same: solve a real annoyance with as few layers as possible between me and the solution.

If you’re interested, the repository is available at  
[https://github.com/spacexnu/pinga](https://github.com/spacexnu/pinga), where you can also find a tentative roadmap and usage examples.
