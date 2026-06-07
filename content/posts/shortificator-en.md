---
title: "Shortificator - My personal video generator"
date: 2026-06-06T09:32:27-03:00
languages: ["english"]
draft: false
tags: ["ai", "youtube", "llm"]
---

# How I built a Shorts factory that runs 100% on my own machine

If you mess with YouTube at all, you've seen Opus Clip, Klap, SubMagic and the
rest. You drop in a long video, the tool cuts the best moments, slaps on animated
captions, and hands you ready-to-post Shorts. It works. The catch is the usual
one: it's SaaS, you pay monthly, and your video gets uploaded to someone else's
server.

I wanted the same thing running on my RTX 5070 — nothing leaving the machine, no
paid API. That's how **shortificator** came to be.

This post is about how it works under the hood: the technical calls, what went
wrong along the way, and why some things are the way they are.

## The idea in one sentence

Take a long video, transcribe it, let a local LLM pick the best cuts, crop it to
vertical while tracking the face, burn in captions, and render. All offline.

Four steps:

```
input.mp4
   ├─ 1. Transcribe       faster-whisper (large-v3, CUDA, word timestamps)
   ├─ 2. Analyze clips    Ollama → JSON (start, end, hook, score)
   ├─ 3. Reframe + caption YuNet (face crop) + OpenCV
   └─ 4. Render           FFmpeg (CRF 18, AAC 192k) → output/*_short_NN.mp4
```

None of these pieces is exotic. The fun is in how they fit together — and in the
boring details nobody talks about.

## Step 1: transcription with word-level timestamps

I use `faster-whisper` with `large-v3` on the GPU. Not just for the text — I need
the **timestamp of every word**. Without that, forget CapCut-style captions where
the current word lights up as the person speaks. The word timestamp is what syncs
the highlight to the audio.

This is the slowest step and the one I least want to repeat, so the transcript
gets saved to JSON and can be reused with `--transcript`, skipping Whisper
entirely on later runs. When you're iterating on a prompt or a caption style,
that's the difference between waiting 5 seconds and 5 minutes per test.

## Step 2: letting a local LLM pick the cuts (the annoying part)

This is where most of the pain lives.

The plan: send the transcript to Ollama and ask for the best moments as JSON
(`start`, `end`, `hook`, `reason`, `score`). Sounds trivial. It is not, when the
model is small.

Three things I learned the hard way:

**1. Without structured output, the model makes stuff up.** Ask for "respond in
JSON" with no schema and `qwen2.5:7b` would hand me a gorgeous JSON full of
`video_title`, `key_points`, and an empty `candidates`. It invented its own
structure. The fix was Ollama's *structured outputs*: I hand-write a JSON Schema
and pass it in `format=`. Now the model is **forced** into the fields I want. With
a schema, even a 7B model behaves.

**2. Small models pile everything at the start.** Feed it the whole video and ask
for 5 cuts, and it dumps all 5 into the first few minutes, ignoring the rest. The
fix was slicing the video into N time windows (`--max-shorts` windows) and making
**one call per window**, asking for 2 candidates each. Each call only sees its own
slice. Then I merge, sort by score, drop overlaps, and trim to the requested
count. Bonus: each call is cheaper because it sees less text, and the number of
cuts stops drifting between runs.

**3. The model ignores duration limits.** I ask for "between 30 and 60 seconds"
and it happily returns a 12s cut and a 2-minute one. Instead of discarding and
losing the candidate, I **fix it**: `fit_clip_window` expands the short ones and
trims the long ones around the cut's center, clamped to the video's edges. The
result: any model, no matter how badly it follows instructions, produces a valid
candidate.

For editorial quality I use `mistral-small`. It's slower, but the result also
goes to disk (`--candidates`), so I only pay that cost once. When I'm just
iterating, `qwen2.5:7b` does the job.

## Step 3: vertical crop that follows the face

Going from horizontal to 9:16 without losing what matters is harder than it
looks. A dumb center crop slices the person's face in half the moment they lean to
one side.

For face detection I used to run YOLOv11l-face. It worked great, but it's **AGPL**
and it dragged the whole `torch` along. For a project I want open source and light
to install, that's double poison: a copyleft license and several gigs of extra
dependency. I swapped it for **YuNet** (`cv2.FaceDetectorYN`), which ships with
OpenCV, is Apache-2.0, runs on CPU, and the model is 230 KB — downloaded
automatically on first run. I lost a bit of robustness on tiny faces (PiP), but
gained a permissive license and a PyTorch-free install. For the use case, a fair
trade.

Details that matter in practice:

- Running the detector on every frame of a 4K video kills performance. So I detect
  on a downscaled frame (up to 960px wide) and only every 3 frames, reusing the
  box in between.
- The face box jumps frame to frame and causes jitter. I smooth it over a
  15-frame window so the camera follows gently instead of twitching.
- When there's more than one face, I always take the **biggest** box. As a side
  effect, that discards the small false positives YuNet sometimes spits out.

There's also a `gameplay` mode: there I load no detector at all and do a stable
center crop, to preserve the crosshair, HUD, and context. Detecting "a face" in
the middle of a DayZ session makes no sense.

## Step 4: captions that don't look auto-generated

First stumble: `cv2.putText` only speaks ASCII. Any accented word turned into
question marks — unacceptable in Portuguese. My local OpenCV build also lacked
`cv2.freetype`. The fix: render captions with **Pillow** (TrueType font, real
UTF-8) and composite them onto the frame via OpenCV.

The fun part is the CapCut-style dynamic caption. My first version used a sliding
window centered on the current word — the text scrolled with every spoken word. It
was exhausting to read, like a nervous teleprompter. Threw it out and went with
**fixed blocks**: I partition the words into fixed-size groups, the block stays
still, and only the highlight (current word) moves within it. The block only swaps
when speech crosses into the next group. During micro-pauses I hold the last block
instead of clearing it, otherwise it flickers. It's exactly the behavior you see
in the Shorts that actually land.

And all of it is configurable by flag: font, size, color, highlight color, stroke,
vertical position, words per block. The defaults reproduce the old hardcoded
style, so anyone who doesn't want to fiddle doesn't have to.

## Rendering

FFmpeg, always via `subprocess.run`, never `os.system`. CRF 18 for high visual
quality, AAC 192k for audio. The render is frame by frame, so there's a one-line
progress bar with percentage, processed frames, ETA, and elapsed time — because
staring at a silent terminal for minutes is torture.

## Why local, and why it matters

The algorithm isn't the secret — anyone can wire up Whisper + LLM + FFmpeg. The
real value is **running it all offline**: no subscription, no uploading your
footage to anyone's server, no dependency on an API that changes price or
disappears.

The irony is that the hard part of turning this into a product isn't the code —
it's the **install friction**. CUDA, drivers, WSL, Ollama, downloading multi-gig
weights. That's exactly why I worked to keep the project light: MIT license, a
230 KB detector, no torch, dependencies via Poetry. The fewer monsters between
`git clone` and your first Short, the better.

## Where it lives

shortificator is open source (MIT) on [GitHub](https://github.com/spacexnu/shortificator).
If you're into local AI and video automation, take a look — and if you get stuck
on the install, tell me, because that friction is exactly what I want to kill.
