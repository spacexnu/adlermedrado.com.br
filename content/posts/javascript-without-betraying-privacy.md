---
title: "I added JavaScript to this site and your privacy is still intact"
date: 2026-06-09T10:00:00-03:00
languages: ["english"]
draft: false
tags: ["privacy", "javascript", "hugo", "meta"]
---

# JavaScript without betraying the premise

If you follow this site, you know it has one non-negotiable premise: **I don't
track visitors**. No Google Analytics, no pixels, no third-party cookies, no
fingerprinting. I don't know who visited, I don't know how many people visited,
I don't know where anyone came from. And I like it that way.

For a long time that premise traveled together with an implicit rule: no
JavaScript. But the site now runs two scripts. The first is the
[light/dark theme toggle](/posts/light-theme-twenty-lines-of-javascript/),
which arrived a short while ago. The second, newer still, is the set of random
BBS-style taglines that show up below the header. This post exists to explain
why that **doesn't break the premise**, and to share some housekeeping I did on
the site's structure while I was at it.

## JavaScript is not the enemy. Tracking is.

The "no JavaScript" rule was always a means, never the end. The end is: not a
single byte of information about you leaves your browser because of this site.
JavaScript became synonymous with tracking because that's how 99% of the web
uses it: to load analytics, to fingerprint your browser, to follow you across
sites. But the language itself is just a tool. What matters is what the code
does.

Here's what the two scripts on this site do:

**The theme toggle** stores your preference (light or dark) in your browser's
`localStorage`. That value never leaves your machine. I have no way to read it,
it's not sent in any request, and you can wipe it whenever you want. It's your
browser remembering something for **you**, not for me.

**The taglines** are even simpler: a list of one-liners embedded in the JS file
itself and a `Math.random()` that picks one on every page load. Nothing is
stored, nothing is read, nothing is sent. The browser rolls the dice, shows the
result, and forgets.

Both files are served from my own server, with no third-party CDN and no
external dependency. There isn't a single network call in either script. None.
And like every other asset on this site, they're GPG-signed: you can check the
matching `.asc` file and verify that what reached your browser is exactly what
I published.

Don't trust me? Good, you shouldn't. The code is tiny and readable: you can
audit it in under a minute with a quick view-source. And if you browse with
JavaScript disabled, the site still works in full. Dark theme is the default
and a fixed tagline shows up instead of a random one.

## The housekeeping: goodbye, dark-flat

Since I was already touching the site, I fixed something that had been bugging
me for a while. The theme I use here, **dark-flat**, lived in a separate
repository, plugged into the site as a git submodule. It looked organized. In
practice it was the opposite.

Over time I kept overriding the theme's partials with local versions inside the
site's repository: `head.html`, `header.html`, entire layouts. The result:
half the theme came from one place, half from the other, and I had to keep
Hugo's template lookup order in my head just to know which file was actually in
use. Worse, any CSS tweak required a commit and push to the theme repo **and
then** another commit in the site repo just to bump the submodule pointer. Two
operations to change a color.

A separate theme makes sense when it's a product, something other people will
use on other sites. That was never the case. dark-flat existed for this site
alone, so the separation was pure friction with zero benefit.

The fix was obvious: I moved the theme's files into the site repository, kept
the local versions wherever an override already existed (which is exactly what
Hugo was rendering anyway), and removed the submodule. I diffed the build
before and after: identical output, byte for byte. Now it's one repository, one
commit per change, and no ambiguity about which file wins.

## Wrapping up

The site still has no idea who you are. It still works without JavaScript. It's
still GPG-signed. It just gained a theme toggle, some taglines with a strong
whiff of 90s BBS culture, and a structure that no longer gives me maintenance
headaches.

Privacy isn't about technical dogma. It's about what happens to your data.
Here, the answer remains the same as it's always been: nothing.
