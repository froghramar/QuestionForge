# QuestionForge

## Vision

QuestionForge is an open-source interview knowledge base.

The goal is not to compete with LeetCode or HackerRank. Instead, QuestionForge is the Wikipedia of technical interview knowledge.

Every question is written in Markdown, version controlled in Git, reviewed through pull requests, and published as a static website.

The platform should be usable entirely without authentication, APIs, databases, or server-side code.

Cloudflare Pages builds the website directly from the Git repository.

Contributors only need GitHub.

Readers only need a browser.

---

# Principles

* Static first
* Offline friendly
* Open source
* Searchable
* Fast
* Accessible
* AI optional
* Community driven
* Git is the database
* Markdown is the CMS

---

# Phase 1 Goals

The MVP should answer one question:

> "Can I quickly find high-quality interview questions and their answers?"

No accounts.

No backend.

No analytics dashboard.

No comments.

No AI.

Only excellent content.

---

# Tech Stack

* Astro
* React (only when interactive components are needed)
* TypeScript
* Tailwind CSS
* Cloudflare Pages
* GitHub Actions (optional for validation)
* Markdown
* MDX
* Lunr.js or Pagefind for local search

No API.

No database.

No authentication.

---

# Repository Structure

```
/
    apps/
        website/

    content/
        questions/
        companies/
        topics/
        learning-paths/

    docs/

    scripts/
```

---

# Content Structure

Each interview question lives in its own Markdown file.

Example:

```
content/questions/csharp/async-await.md
```

Example frontmatter:

```yaml
title: Async vs Await
slug: async-await
difficulty: Medium
category: C#
tags:
  - async
  - task
  - threading
companies:
  - Microsoft
  - Stack Overflow
estimated_time: 10
updated: 2026-07-31
```

Then:

```md
# Question

Explain async/await in C#.

---

# Expected Answer

...

---

# Common Mistakes

...

---

# Follow-up Questions

...

---

# References

...
```

---

# Categories

Initially support:

* C#
* .NET
* ASP.NET Core
* Entity Framework
* SQL
* PostgreSQL
* JavaScript
* TypeScript
* React
* Next.js
* Node.js
* Docker
* Kubernetes
* Redis
* RabbitMQ
* System Design
* DevOps
* Behavioral

---

# Navigation

Homepage

↓

Categories

↓

Topics

↓

Question

Each page should have breadcrumbs.

---

# Search

Use a client-side static search index.

Requirements:

* instant search
* works offline
* fuzzy matching
* keyboard shortcut (/)

No server required.

---

# Difficulty Levels

* Beginner
* Easy
* Medium
* Hard
* Expert

---

# Question Types

* Technical
* Coding
* System Design
* Database
* DevOps
* Architecture
* Behavioral
* Security
* Debugging
* Code Review

---

# Learning Paths

Examples:

Junior Backend Developer

↓

.NET Developer

↓

Senior Backend Engineer

↓

Cloud Engineer

↓

Staff Engineer

Each path links existing questions.

No duplicated content.

---

# Contribution Workflow

Every contribution should be a GitHub Pull Request.

Contributors:

1. Copy a template.
2. Fill the Markdown.
3. Submit PR.

Maintainers review quality.

No admin dashboard.

---

# Templates

Provide templates for:

* Question
* Learning Path
* Topic
* Company

---

# Quality Checklist

Every question should include:

* clear wording
* expected answer
* explanation
* follow-up questions
* references
* difficulty
* tags

---

# Future Features

Not in Phase 1.

* AI interviewer
* Mock interviews
* User accounts
* Saved progress
* Flashcards
* Notes
* Ratings
* Comments
* Certifications
* Company interview experiences
* Multi-language support
* Personal study plans
* PDF export
* Mobile app
* Browser extension

---

# Success Criteria

QuestionForge becomes the easiest place to:

* search interview questions
* learn concepts
* contribute improvements
* discover new topics

without requiring a backend or user account.

The repository itself should become the canonical source of truth.
