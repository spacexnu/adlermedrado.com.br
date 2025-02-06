---
title: "Job Finder - Automating job search with AI powered analysis"
date: 2025-02-06T18:08:32-03:00
tags:
  - "AI"
  - "python"
  - "open-source"
---

<img src="/images/header-job-search.png" alt="Job Finder" width="100%" height="auto"></img>

Hey everyone! I just wanted to share a new pet project I've been working on.

I built **Job Finder** to automate job searches, analyze descriptions using AI, and filter the best opportunities based on personal criteria.

**Job Finder** is an **open-source** project designed to **automate job searching, analyze job descriptions using AI, and filter opportunities based on predefined criteria**. Initially developed as a personal study project, it demonstrates the integration of **automation, AI, and data processing**, but can also be useful for others looking to streamline job searches.

---

## How It Works
### 1 - Automated Scraping
The system **automatically scrapes job postings** from multiple sources, including **GitHub Issues** and other job boards. These sources can be extended as needed.

### 2 - Data Processing & Optimization
Before being analyzed, job descriptions undergo a **sanitization process using spaCy** to **reduce token consumption** when interacting with OpenAI’s API. This step removes:
-  **Emails, phone numbers, and addresses** (to avoid irrelevant token usage)
-  **Special characters, formatting issues, and excessive whitespace**
-  **Common stopwords** that do not contribute to job analysis

By optimizing job descriptions before submission, the system significantly **reduces costs and improves response accuracy** from the AI.

### 3 - AI-Powered Analysis
Once cleaned, job descriptions are sent to **OpenAI’s API**, where they are evaluated based on key criteria:
- **Seniority Level** – Only **Senior-level or higher** roles are considered.
- **Technology Stack** – Jobs must include **specific technologies** (e.g., Python, Java, PHP).
- **Remote Work** – The job must be **fully remote** to be marked as a match.

These criteria determine if a job **fully matches, partially matches, or does not match** the user’s preferences.

### 4 - Classification & Filtering
After AI processing, each job is categorized as:
- ✔ **Fully Matches** – Meets all criteria (senior-level, required tech stack, fully remote)
- ✔ **Partially Matches** – Meets some but not all conditions
- ✔ **Does Not Match** – Does not meet essential requirements

Filtered results are **stored in the database** and can be retrieved for review.

---

## Customization & Future Enhancements
The criteria used for filtering **can be modified**, but currently, changes must be made directly in the **codebase**. However, a **configuration panel via Django Admin** is planned in the **roadmap** to allow users to define criteria dynamically **without modifying the code**.

Future updates aim to introduce:
- **Support for additional job sources** (LinkedIn, Indeed, etc.)
- **More AI providers** beyond OpenAI
- **Customizable job filtering via Django Admin**
- **Enhanced AI-driven ranking based on job relevance**
- **Web-based dashboard for job visualization**

---

## Tech Stack & Architecture
- **Backend:** Built with **Django**, using Django ORM for database management.
- **Task Queue:** Uses **Celery** for background job processing.
- **Job Scheduling:** Managed via **Celery Beat**, allowing automated job scraping at scheduled intervals.
- **Database:** PostgreSQL (recommended) or SQLite (for local development).
- **Message Broker:** Uses **Redis** to handle Celery tasks efficiently.
- **AI Processing:** Integrates **OpenAI API** for job description analysis.
- **Data Sanitization:** Utilizes **spaCy** to preprocess and clean job descriptions before AI submission.
- **Docker Support:** Provides an optional **Docker Compose setup** for running PostgreSQL and Redis.

---

## Why This Project?
This project was created **as a learning experiment**, combining **automation, AI integration, and efficient data processing**. However, it has real-world applications and can be **useful for anyone looking to automate and refine job searches** with AI-powered filtering.

**I know I could use tools like [n8n](https://n8n.io) or [Make](https://www.make.com/en) to automate this, but I'm a coder, and coders love to code. :)**

Since this is an **open-source project**, contributions are welcome! You can customize, improve, or extend its functionality as needed. Feel free to explore, use, or contribute!

[Go and check out on GitHub](https://github.com/adlermedrado/job_finder)!
