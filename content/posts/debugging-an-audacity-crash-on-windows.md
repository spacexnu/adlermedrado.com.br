---
title: "Debugging an Audacity Crash on Windows: From Bluetooth Headset to Open Source Bug Report"
date: 2026-10-02T18:09:46-03:00
languages: ["english"]
description: "Investigating an Audacity crash on Windows with WinDbg, tracing a Bluetooth audio error, and turning the findings into an open source bug report."
draft: false
tags: ["debugging", "audacity", "windows", "open-source"]
---

A few weeks ago, Audacity 4.0.0 started crashing on my Windows machine.

Not occasionally. Not after doing something weird inside the application.

It crashed every single time I launched it while my Philips TAH6509 Bluetooth headset was connected.

Turn the headset off, Audacity starts normally.

Turn it on, launch Audacity, wait a few seconds, crash.

That was enough to make me curious.

Instead of just working around the problem, I decided to find out what was actually happening.

## The initial symptom

The behavior was remarkably consistent.

With the Bluetooth headset connected, Audacity would begin starting normally. A few seconds later, the audio playing through the headset would become distorted, Audacity would terminate, and the audio would immediately return to normal.

The simplest reproduction was basically:

1. Connect the Philips TAH6509.
2. Confirm Bluetooth audio is working.
3. Start Audacity 4.0.0.
4. Wait approximately five seconds.
5. Audacity crashes.

Disconnect the headset and the problem disappears.

When debugging software, reproducibility is gold. Random crashes are painful. A crash you can trigger almost on demand is an invitation.

## First suspects

My first assumption was that this was related to the Windows audio backend.

Audacity can interact with Windows audio through different hosts, so I tried changing them.

WASAPI didn't solve it.

MME didn't solve it.

I disabled the Philips hands-free recording endpoint.

Still crashed.

I reset Audacity's configuration.

Still crashed.

At that point, changing settings blindly wasn't going to tell me much.

I needed the crash itself.

## Getting the dump

Windows Event Viewer showed the application terminating inside `ucrtbase.dll` with exception code:

```text
0xc0000409
```

That value can easily send you in the wrong direction because it is frequently associated with stack buffer overrun/security-check failures.

But the actual fast-fail subcode told a more specific story:

```text
FAST_FAIL_INVALID_ARG
```

That matters.

This was not evidence that I had discovered some exotic stack corruption vulnerability. The process was deliberately terminating after an invalid parameter reached the Microsoft C runtime.

So I collected a full process dump and opened it in WinDbg.

Now things started getting interesting.

## Following the stack

The relevant path ended around:

```text
ucrtbase!invoke_watson
ucrtbase!invalid_parameter_internal
ucrtbase!__crt_stdio_output...
ucrtbase!common_vsprintf
ucrtbase!_stdio_common_vswprintf_p
wxbase32u_vc_x64_custom.dll
Audacity4.exe
```

The Audacity release build obviously doesn't contain all the private debugging symbols I would have loved to have, so some symbols couldn't be trusted blindly.

But inspecting the relevant Audacity frame and resolving the indirect call target led to:

```text
wxString::FormatV
```

The approximate failure path was therefore:

```text
Audacity
    -> wxString::FormatV
    -> wxWidgets formatting internals
    -> Microsoft CRT printf-style formatting
    -> invalid parameter handling
    -> FAST_FAIL_INVALID_ARG
```

That was already much more useful than:

> Audacity crashes when Bluetooth is enabled.

But there was another clue sitting in memory.

## PortAudio meets Bluetooth

Searching the dump revealed a PortAudio error involving the Bluetooth device:

```text
PortAudio stream error creating device list:
Windows WDM-KS:Input
(@System32\drivers\btha2dp.sys,#1;%1%0
;(Philips TAH6509)):
Invalid device
```

The device was going through Microsoft's Bluetooth A2DP stack, involving:

```text
btha2dp.sys
```

That made the chain considerably clearer.

Audacity was enumerating audio devices through PortAudio.

PortAudio encountered an invalid WDM-KS Bluetooth endpoint.

That generated an error string.

Audacity then ended up processing that error through wxWidgets formatting code.

And somewhere along that path, the Microsoft C runtime rejected an invalid formatting parameter and killed the process.

But there was one particularly suspicious detail.

## `%1%0`

The PortAudio error string contained this sequence:

```text
%1%0
```

That's interesting when the same string eventually travels through printf-style formatting code.

Looking through the dump, I found copies of the original string:

```text
...btha2dp.sys,#1;%1%0...
```

and other copies where that portion appeared altered.

That raised a fairly obvious hypothesis:

What if externally supplied device/error text containing `%` sequences was eventually being interpreted as formatting syntax instead of plain text?

The crash was occurring around:

```text
wxString::FormatV
```

and then:

```text
_stdio_common_vswprintf_p
```

It certainly looked suspicious.

But there is an important difference between debugging and storytelling:

**A plausible explanation is not the same thing as a proven root cause.**

I couldn't prove from the dump alone that `%1%0` was definitively responsible for the crash.

So when I opened the bug report, I described it exactly as that: an observation and a hypothesis, not a conclusion.

## Opening the issue

At that point I had enough information for something much more useful than:

> "Audacity crashes with my Bluetooth headphones."

I had:

- a consistently reproducible crash;
- the exact Audacity and Windows versions;
- the headset model;
- the Windows Bluetooth service involved;
- the driver involved in the PortAudio error;
- Event Viewer information;
- the Windows fast-fail code;
- a full process dump;
- a WinDbg stack trace;
- the relevant PortAudio error string;
- the approximate formatting path;
- reproduction instructions;
- and a possible explanation that was clearly marked as unproven.

So I opened Audacity issue [**#12210**](https://github.com/audacity/audacity/issues/12210).

I also kept the approximately 205 MB full process dump locally instead of uploading it publicly. Full process dumps may contain information you don't necessarily want sitting forever in a public GitHub issue.

If the maintainers needed more information, I could inspect specific memory locations or run additional tests.

That, to me, is what a useful bug report should look like.

You don't need to know the solution.

You need to make the problem easier for someone else to investigate.

## And then someone else reproduced it

This is where things became more interesting.

Another Audacity user reported the same problem and said their only workaround was using a wired headset.

That immediately changed the character of the issue.

It was no longer just:

> Something strange happens on my computer.

There was independent evidence that another user could experience the same failure.

Later, an Audacity maintainer asked us to test a development build.

The other user tested it and reported:

> “This build does not crash!”

The maintainer replied that the change would be published as a proper update.

That's exactly the feedback loop you want to see in open source:

```text
user hits bug
    ↓
bug is investigated
    ↓
reproduction is documented
    ↓
another user confirms it
    ↓
maintainer produces test build
    ↓
user validates fix
    ↓
fix moves toward release
```

My own attempt to test the x86_64 artifact hit another problem: Windows rejected `wavpackdll.dll` as an invalid image with error `0xc0e90002`.

So I couldn't personally confirm the fix using that particular artifact.

And that's fine.

Debugging isn't a movie where every thread needs to end with the protagonist typing the final command and dramatically hitting Enter.

The useful information had already made its way upstream.

## Open source contribution doesn't always mean a pull request

Developers often associate contributing to open source with writing code.

Fork the repository.

Change something.

Open a pull request.

That's obviously contribution.

But it isn't the only kind.

Finding a reproducible bug, collecting evidence, narrowing the failure path and giving maintainers enough technical information to act on it is also contribution.

A report saying:

> "It doesn't work."

doesn't give a maintainer much to work with.

A report containing a reproducible scenario, environment information, crash data, stack traces and a carefully separated hypothesis can save hours of investigation.

You don't need to know the fix.

Sometimes the most useful thing you can do is reduce the unknowns.

## One crash at a time

I originally just wanted Audacity to stop crashing when my Bluetooth headset was connected.

Instead, I ended up spending time inside WinDbg, digging through a Windows process dump, following wxWidgets formatting calls, inspecting PortAudio errors and eventually opening a bug report upstream.

And someone else was experiencing the same thing.

That's one of the reasons I still like software engineering after all these years.

Sometimes the problem is the work.

You start with:

```text
"Why the hell does this thing crash when my headphones are connected?"
```

and a few hours later you're staring at:

```text
FAST_FAIL_INVALID_ARG
```

and searching memory for strings coming from `btha2dp.sys`.

Software is layers upon layers of abstractions.

Every once in a while, something breaks badly enough that you get to look through them.

And that's usually where things get interesting.
