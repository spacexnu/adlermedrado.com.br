---
title: "Updated job_finder to run LLM locally"
date: 2026-04-25T22:16:32-03:00
languages: ["english"]
tags:
  - "AI"
  - "python"
  - "open-source"
---

<img src="/images/header-job-search.png" alt="Job Finder" width="50%" height="auto"></img>

# Running LLM locally with Ollama: migrating my Job Finder project

[More than one year ago I built a simple project to start studying AI](https://adlermedrado.com.br/posts/automating_job_search_with_ai_powered_analysis/).

At the time, I integrated it with the OpenAI API. It worked well, but over time I started to feel the usual friction: cost per request, dependency on external services, and limited control over the runtime.

Today, I migrated this project to run using a local LLM.

This post is a record of what I did and what I learned in the process.

---

# Local Ollama Migration Notes

This document records the migration of Job Finder's AI analysis flow from using the OpenAI API as the default runtime to running a local Ollama model.

The project remains compatible with OpenAI-compatible APIs, including the OpenAI API itself. The current local setup uses Ollama to run the analysis model on the developer machine.

## Hardware And Runtime

The migration was tested on the following machine:

- Laptop: Acer Predator Helios 16 Neo AI
- GPU: NVIDIA RTX 5070 with 8 GB VRAM
- CPU: Intel Core Ultra 9
- RAM: 32 GB
- Runtime environment: WSL 2
- Local inference server: Ollama
- Model selected for the working setup: `qwen3:8b`

## Why Run Locally

The decision to run the AI analysis locally was based on three main reasons.

First, sovereignty. Job Finder analyzes job descriptions collected from external sources, and running the model locally keeps the analysis flow under local control. Even though the current data is not especially sensitive, local execution is a useful architectural option when privacy, data ownership, or operational independence matter.

Second, cost. The project can process many job descriptions over time. Running each analysis through a hosted API creates a recurring variable cost. A local model shifts that cost to local hardware and electricity, which is a better fit for this personal project and its experimentation cycle.

Third, learning. This project is also being used to study local LLM infrastructure, model behavior, GPU constraints, prompt design, and the practical tradeoffs between hosted APIs and local inference.

## Original OpenAI-Compatible Flow

The project already used the official OpenAI Python client through `jobs.analyzers.openai.JobAnalyzer`.

The original flow was:

1. `JobAnalyzerService` fetched sanitized, unanalyzed job descriptions.
2. A `JobAnalyzer` instance called `client.chat.completions.create(...)`.
3. The model was expected to return one of three labels:
   - `Fully meets`
   - `Partially meets`
   - `Does not meet`
4. The result was stored in `JobDescription.criteria_status`.

This design made the first step of the migration straightforward because Ollama exposes an OpenAI-compatible API at:

```text
http://localhost:11434/v1
```

The environment variables were extended so the model provider can be configured without changing the service code:

```env
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_MODEL=qwen3:8b
OPENAI_API_KEY=ollama
```

The `OPENAI_API_KEY` value is required by the OpenAI client interface, but Ollama ignores it.

## Problems Found During The Migration

### Environment Variables Were Not Being Overwritten

After changing `.env` from `llama3` to `qwen3:8b`, Django still loaded the old model name from the shell environment.

The project used:

```python
environ.Env.read_env('.env')
```

By default, `django-environ` does not overwrite environment variables that already exist in the process. This was changed to:

```python
environ.Env.read_env('.env', overwrite=True)
```

That makes `.env` the source of truth for local development and prevents stale values from remaining active inside Django or Celery processes.

### Ollama Model Was Missing

The first Ollama error was a `404` response from:

```text
POST /v1/chat/completions
```

The route existed, but the configured model did not. The response indicated:

```text
model 'llama3' not found
```

The fix was to install the selected model:

```bash
ollama pull qwen3:8b
```

The installed models can be checked with:

```bash
ollama list
```

### Qwen 3 Thinking Mode Caused Empty Responses

After switching to `qwen3:8b`, the OpenAI-compatible endpoint returned successful HTTP responses, but the application still stored `Error`.

The raw response showed:

```text
finish_reason = "length"
message.content = ""
message.reasoning = "...long reasoning trace..."
```

The model was spending the entire output budget in reasoning mode and never reached the final answer. Increasing `max_tokens` from `200` to `1024` made the model return a final label, but this caused each analysis to take too long, sometimes around a minute or more per job description.

This was not acceptable for the job analysis worker.

## Final Technical Solution

The final solution keeps OpenAI compatibility for remote providers while using Ollama's native API when the configured base URL points to a local Ollama server.

When `OPENAI_BASE_URL` points to:

```text
localhost:11434
```

the analyzer now calls:

```text
POST http://localhost:11434/api/chat
```

instead of:

```text
POST http://localhost:11434/v1/chat/completions
```

The native Ollama request includes:

```json
{
  "think": false,
  "stream": false,
  "options": {
    "num_predict": 64,
    "temperature": 0.1
  }
}
```

The important part is:

```json
"think": false
```

For Qwen 3 models, this disables thinking mode through Ollama's native chat API. That avoids wasting tokens on reasoning traces and lets the model directly return the classification label.

The output budget was then reduced to:

```text
num_predict = 64
```

This is enough because the expected response is only one short label.

The analyzer still uses the OpenAI Python client when the configured base URL is not a local Ollama server. This keeps the project compatible with OpenAI and other OpenAI-compatible providers.

## Final Result

The final local setup successfully analyzes job descriptions with `qwen3:8b` through Ollama.

The observed behavior improved from:

```text
frequent Error statuses
slow analysis, sometimes around 1m30s per item
empty model responses caused by reasoning token exhaustion
```

to:

```text
stable classification results
no observed analysis errors in the tested run
sub-second response in a simple local validation case
```

One direct validation call through `JobAnalyzer` returned:

```text
result = 'Fully meets'
elapsed = 0.27s
```

Real-world timing can still vary depending on the size of the job description, model load state, GPU scheduling, and whether Ollama has the model already loaded in memory.

## Operational Notes

After changing model or environment settings, restart Celery workers so they reload the environment:

```bash
celery -A job_finder worker --loglevel=info
```

If Celery Beat is running, restart it as well:

```bash
celery -A job_finder beat --loglevel=info
```

Records that previously failed can be reprocessed with:

```sql
UPDATE job_descriptions
SET is_analyzed = false, criteria_status = null
WHERE criteria_status = 'Error';
```

The next planned experiment is to compare `qwen3:8b` with lighter models such as `gemma3:4b` to measure the tradeoff between latency and classification quality on the same set of job descriptions.
---

## Final thoughts

Running LLM locally is not just about saving money.

It changes how you think about building systems.

You stop renting intelligence and start owning part of the stack.
