---
title: "Tools for Daily Use"
description: "Every now and then people ask me what I usually use on my computer day to day, so I decided to write this post, recording what I use right now so I can compare it with what I’ll be using in the future.\nI’m a person of simple habits, so unlike a lot of people who write posts like this, I don’t have ants in my pants and go around using everything I come across. So here’s the list.\n"
url: "https://adlermedrado.com.br/posts/tools-for-daily-use/"
date: "2023-10-12T10:44:28-03:00"
---

# Tools for Daily Use


Every now and then people ask me what I usually use on my computer day to day,
so I decided to write this post, recording what I use right now so I can
compare it with what I'll be using in the future.


I'm a person of simple habits, so unlike a lot of people who write
posts like this, I don't have ants in my pants and go around using everything I come
across. So here's the list.


## General purpose utilities


**[iCloud](https://icloud.com)** - I'm using iCloud Drive to store
documents, photos, etc.

Since everyone here at home uses Apple products at some level, I have a
family iCloud account shared with my wife and my kids, so we keep
photos, documents, etc. in a single place.

I also keep my email accounts on iCloud. iCloud lets you use
custom email domains, so my emails under the `adlermedrado.com.br` domain
run on iCloud's infrastructure.

**Apple Mail** - On the Mac as well as on the iPad and iPhone, I use Apple Mail,
including for Gmail, which I still use for a few things.

**[PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy)/[GnuPG](https://www.gnupg.org)** - Since
we're talking about email, I use PGP/GPG to
encrypt emails I consider sensitive (actually, not just emails).
I use the open source version of [GPG Tools](https://gpgtools.org) on the Mac,
but unfortunately after updating to [macOS Sonoma](https://www.apple.com/macos/sonoma/)
its [integration with Apple Mail was broken](https://gpgtools.org/sonoma) by changes Apple
made to the Apple Mail API, so for now encrypt and decrypt happen only via the command line.

I use GPG to sign every page of this site. Just import [my public
key](https://adlermedrado.com.br/pub-key.asc) and run the command
at the footer of this page to validate its authenticity.

**Apple Notes** - For daily notes I just use Apple Notes, so it already integrates
with all my devices via iCloud.

**Apple Shortcuts** - This is an automation tool present in Apple's OSes.
With it you can automate repetitive tasks. Being the good lazy person I am,
I try to automate everything I can, some things with Shortcuts, others with
bash scripts. For example, I have playlists in Apple Music I usually listen to
when I go work out, so with Shortcuts a single click opens the playlist and
starts playing it in Apple Music. With Shortcuts you can even start the playlist as soon as
the iPhone's GPS detects I've arrived at the gym. Very handy.

**Apple Music** - I use it to listen to music 😬. Apple Music comes included in the
family plan I pay for on iCloud.

I also have YouTube Music, which comes bundled with YouTube Premium, and
Spotify. I'd really rather not pay for Spotify, but my kids use it and so I pay for the
family plan. Occasionally I use it to listen to some podcasts and also
some music like the old Álibi and Câmbio Negro albums, which are only there.

**Safari and Brave** - Day to day, I use Safari to browse the web, except
when I'm doing anything related to [Nostr](https://nostr.com),
in which case I use Brave because of its integration with [Alby](https://getalby.com), which
manages my Nostr keys and some things related to my Bitcoin
[Lightning Network](https://lightning.network) wallet ([Bitcoin](https://bitcoin.org/en/)).

While we're at it: if you don't know Nostr and don't know Bitcoin, go read up on them. Just a tip.

**[Alfred App](https://www.alfredapp.com)** - I use it to replace macOS's
Spotlight. It has some interesting features, especially if you pay for the PowerPack, like the workflows that automate a lot of our day-to-day.
There are alternatives to it, like [Raycast](https://www.raycast.com),
but I don't see a reason to switch.

**Awake** - A tool similar to `caffeine` or `amphetamine`, used to prevent
the monitor from turning off or going into screensaver mode.


## Office suite

**Apple Pages** - For text editing

**Apple Numbers** - For spreadsheets

**Apple Keynote** - For presentations

But after seeing the college work my daughter produces using Canva,
I'm seriously considering using it too for a few things.


## Audio and video editing

**Apple iMovie** - The videos I publish on YouTube are edited with it.
For now it meets my needs.

**Apple Garage Band** - When I need to do audio editing.
Anyone who has heard my famous song **suco de cajú** knows what I'm talking about.


##  Terminal / Shell


**[Wezterm](https://wezfurlong.org/wezterm/)** - After many years using
[iTerm2](https://iterm2.com), I decided to try other options.

I tried [Alacritty](https://github.com/alacritty/alacritty) but didn't like it much, despite it being very fast.

I tested [Warp](https://www.warp.dev) and, despite it having a pretty different proposition, it didn't make
much sense to me to have to create a username/password on Warp's site and have to authenticate
to use the terminal. I don't know if that's still required, but I gave up at the time
because of it. Besides, it seemed very bloated, full of things I probably wouldn't use.


Wezterm, on the other hand, delivered everything I need: a simple interface,
extensible via lua scripts, fast because it runs on the GPU, and cross-platform, unlike iTerm2.
Another interesting point is that its developer was a PHP core developer back when I
used that language a lot, and I always admired their work, which gives me confidence
in using the terminal emulator they develop. I'm even considering supporting the project financially.

iTerm2 isn't bad, quite the opposite, but it's like using a cannon to kill a fly. That's all.

**[Starship](https://starship.rs)** - Makes the terminal pretty, full of bells and whistles and without overhead.

**[Bash](https://www.gnu.org/software/bash/)** - I'm used to it. I tried using ZSH for a while, back when it had features bash didn't have,
but today modern bash already covers everything I need, not to mention that bash is everywhere: any script you find on the internet
is written in bash. Another tip: Shellcheck saves lives.


**[tmux](https://github.com/tmux/tmux/wiki)** - There are some alternatives to tmux,
but I use it day to day simply because it's what I'm most used to.

**[The Silver Searcher](https://github.com/ggreer/the_silver_searcher)** - A
faster alternative to the classic ack. The only problem is that it isn't
available by default on every server.


## Sec


**[1Password](https://1password.com)** - I've used Lastpass and found it bad. I used Bitwarden for a long time,
which is excellent too, even paying annually to support the project, but
no tool in this category compares to 1Password.

The integration 1Password has with macOS and iPhone is the best I've seen among
this kind of tool. Worth the price.

With it I store my passwords, secret notes I don't trust leaving in Apple Notes,
OTP/2FA, and management of my SSH keys, so I don't need to leave them in _.ssh_ because
I use 1Password's _ssh-agent_, which asks for my password or biometrics whenever I
need to use the key and also protects my private key in case of improper
access to my computer.

**[Kaspersky](https://www.kaspersky.com/home-security)** - This is the most
controversial point, since many say you don't need this kind of tool on a Mac,
but it's more than just an antivirus, offering some extra security
against phishing, etc.

And before someone shows up saying: **Yeah, but it's Russian, they're going to spy on you.**
🤒 You trust Facebook/Meta, Google,
Microsoft, etc. Give it a rest.

**[Proton](https://proton.me)** - I use their services, but once my annual subscription
expires I'm going to stop using them. Right now the only tool of theirs I'm still
using is the VPN. Next year I'll sign up for another one, but I haven't decided which yet.


## Development


On this point I won't go into detail about the technologies I use, like language,
RDBMS, message brokers, etc., because that changes almost every day.

I'll focus only on the tools:

**[Intellij Idea](https://www.jetbrains.com/idea/)** - It's the best IDE on the
face of the earth. Worth every cent I pay annually.

It has support for every language I currently use, which
lets me use the same tool for everything and therefore not have trouble with keyboard
shortcuts, etc., which I would have if I used a different tool for each technology I use.

It also offers support for a bunch of things, like Redis, RDBMS, Kubernetes,
Docker, etc.

I use IdeaVim to map the keyboard shortcuts and commands.

**[Neovim](https://neovim.io)** - Recently I moved from Vim to NeoVim. I noticed
that some of the vim plugins I used were no longer under active
development like before, while the neovim plugins keep going at full
speed.

I had to change my entire configuration but I'm liking the result.
I normally use this editor for scripts or for writing texts like this one.

**[Github](https://github.com)** - I still use Github as the main Git
platform for my repositories, although I have some things on Gitlab too. That said, I'm
studying the possibility of migrating everything to my own instance of Gitlab or
Gitea. I'm leaning more toward using Gitea.


## That's it
**Important:** This list describes what I use on my personal computers.
Although I use some of these tools on my employer's computer, the
setup isn't always the same, for various reasons.

**One more thing:** I'd like to know your opinion, which tools you use, whether you agree
or disagree with something I said here, but unfortunately here on this site you
won't be able to tell me. I'm going to write a post about this, but I rebuilt this
site a while ago and removed anything that could invade the privacy
of whoever visits it, so here you won't find Javascript, cookie handling,
session variables, _Big Tech_ trackers, nothing.

So, if you want to give me your opinion or make a comment,
I recommend finding me on [Twitter](https://twitter.com/adlermedrado) (or rather,
on [X](https://x.com/adlermedrado)) or on [Nostr](https://iris.to/amedrado).

See you around.

