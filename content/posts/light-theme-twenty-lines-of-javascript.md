---
title: "Light theme on the site. Twenty lines of JavaScript."
date: "2026-05-22"
languages: ["english"]
tags:
  - "site"
  - "css"
  - "javascript"
---

I added a theme toggle to the site. You can now switch between the dark theme, which has been the default since forever, and a light one with a vaporwave aesthetic: warm cream background, dark teal accents, readable blue on paper.

Before you picture me pulling in a bunch of dependencies: no. There's no React, no Alpine.js, nothing that needed `npm install`. It's literally fewer than twenty lines of vanilla JavaScript, split into two parts.

The first part lives in the `<head>`, an inline script that runs before anything renders. It reads `localStorage`, checks whether you've already picked a theme, and applies the `data-theme` attribute to the `<html>` element right away. Without that script in the `<head>`, the page loads with the wrong theme for a fraction of a second and then flashes to the right one. It's an annoying detail, but a solvable one with ten lines.

The second part is the toggle function itself: flip the attribute, save the choice. That's it.

Everything else is pure CSS. Custom properties redefining the entire color palette based on the value of `data-theme`. No JavaScript managing state, watching for changes, computing anything. The CSS does the heavy lifting.

---

I like keeping the site this way. Simple, functional, no nonsense. Since I redesigned it with the dark synthwave look, the goal has always been the same: as few dependencies as possible, no tracking, no marketing cookies, no third-party scripts loading things you didn't ask for.

There's no Google Analytics here. No ad pixel. No Hotjar recording where you move your mouse. If you visit again a month from now, I won't know. And that's fine.

The light theme was a suggestion that made sense. But the implementation had to be consistent with what this site stands for. It would be weird to add a nice-looking toggle and then, underneath, call five external scripts to "improve the user experience."

There are now two themes. Your choice is saved locally in your browser. No server ever finds out which one you picked.

I think that's how things should work.
