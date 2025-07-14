---
title: "Say Cheese: Catch Curious Eyes on Your Mac with a Snapshot"
date: 2025-07-14T09:32:27-03:00
draft: false
tags: ["security", "macos", "open source", "apple", "scripts"]
---

Ever worried someone might peek at your MacBook when you're not around?

Last Friday, I built a simple, effective, and open-source solution to deal with that — and I called it **Say Cheese**.

Here’s the idea: if someone opens your Mac’s lid without authenticating via Touch ID, a photo is instantly taken and sent to your iPhone through iMessage. You get a live snapshot of the intruder — no fuss.

## How It Works

Under the hood, Say Cheese integrates with [**Do Not Disturb**](https://objective-see.org/products/dnd.html), an open-source tool from Objective-See that monitors the lid sensor on your Mac.

If someone opens the lid without a valid Touch ID authentication, Do Not Disturb creates a temporary file. I hooked into that event and wrote a script that gets triggered automatically.

The script runs **ImageSnap**, which captures an image using the Mac’s front camera. Then, it uses an **AppleScript** to send the photo via iMessage.

So:

- 👀 Someone opened your Mac?
- 📸 Photo taken.
- 📱 Snapshot lands on your phone within seconds.

## Open Source and Easy to Use

**Say Cheese** is available on my GitHub:  
🔗 [github.com/spacexnu/say_cheese](https://github.com/spacexnu/say_cheese)

Just follow the setup instructions and let it run in the background. It’s lightweight, efficient, and discreet.

## More Tools from Objective-See

If you like this kind of approach, check out the [**Objective-See**](https://objective-see.org) site. They provide several powerful open-source tools for macOS, including:

- 🔥 LuLu (firewall)
- 🎙️ OverSight (mic and webcam monitoring)
- 💽 BlockBlock (persistence monitoring)

All free. All built to protect your Mac without bloat or intrusion.

---

**Say Cheese** adds one more layer to your defense strategy — a clever way to catch unauthorized access attempts, especially useful if you work in cafés, shared spaces, or open environments.

Privacy is an attitude.  
Sometimes, it starts with a snapshot.
