# Contributing to QuestionForge

Thank you for contributing! QuestionForge is a community-driven, open-source interview knowledge base. This guide will help you add high-quality content.

## Quick Start

```bash
git clone https://github.com/froghramar/QuestionForge.git
cd QuestionForge
npm install
cd apps/website && npm install && cd ../..
npm run validate   # Check all content
npm run dev        # Start dev server
```

---

## Adding a New Question

### 1. Choose the Right Location

Before creating a question, check if a similar one already exists. If you're explaining a reusable concept (e.g., "What is asynchrony?"), it belongs in `content/concepts/`, not a question.

### 2. Create the Question File

Create a new file in `content/questions/general/<slug>.md`:

```yaml
---
id: question.<unique-id>
title: Short Descriptive Title
slug: url-friendly-slug
difficulty: Medium
topic: topic.existing-topic-id
concepts:
  - concept.related-concept-id
companies:
  - company.google
  - company.amazon
estimated_time: 15
updated: 2026-08-01
---

## Why This Is Asked

2-3 sentences about what the interviewer is evaluating.

## Key Concepts

- Concept 1
- Concept 2
- Concept 3
```

### 3. Create at Least One Variant

Create a variant in `content/variants/<question-slug>/<tech-slug>.md`:

```yaml
---
id: variant.<question-id>.<tech-id>
question: question.<question-id>
technology: tech.<tech-id>
---
# Expected Answer

Detailed answer with code examples.

# Common Mistakes

- Mistake 1 with explanation.
- Mistake 2 with explanation.

# Follow-up Questions

- Follow-up 1? (Answer: brief hint).
- Follow-up 2? (Answer: brief hint).
```

### 4. Validate

```bash
npm run validate
```

This checks:
- All required frontmatter fields exist
- All IDs are unique
- All ID references (topic, concepts, companies, technology) point to existing entities

---

## ID Naming Conventions

| Entity | Format | Example |
|---|---|---|
| Category | `category.<name>` | `category.backend` |
| Technology | `tech.<name>` | `tech.typescript` |
| Topic | `topic.<name>` | `topic.type-systems` |
| Concept | `concept.<name>` | `concept.closures` |
| Question | `question.<name>` | `question.async-await` |
| Variant | `variant.<question>.<tech>` | `variant.async-await.javascript` |
| Company | `company.<name>` | `company.google` |

**Rules:**
- IDs are **stable and immutable** — never rename them after merging
- Use lowercase kebab-case for the name portion
- Slugs are for URLs only — never reference them in relationships

---

## Content Quality Standards

See [docs/QUALITY_STANDARDS.md](docs/QUALITY_STANDARDS.md) for the full rubric.

**Key requirements:**
- Question titles: concise, max ~40 characters, no "What is..." prefix
- Question body: must include "Why This Is Asked" and "Key Concepts"
- Variant answers: include code examples for programming questions
- Common Mistakes: minimum 2, be specific about what goes wrong
- Follow-up Questions: minimum 2, include parenthetical answer hints

---

## Pull Request Checklist

Before submitting a PR:

- [ ] `npm run validate` passes with no errors
- [ ] All IDs follow the naming convention above
- [ ] Question has at least one variant
- [ ] Variant includes Expected Answer, Common Mistakes, and Follow-up Questions
- [ ] No duplicate content — check `content/concepts/` first
- [ ] Difficulty is calibrated (see Quality Standards)
- [ ] Estimated time is realistic (Beginner: 5-10m, Easy: 10m, Medium: 10-15m, Hard: 15-20m, Expert: 15-20m)

---

## Difficulty Calibration

| Level | What It Tests | Example |
|---|---|---|
| **Beginner** | Basic terminology and definitions | "What is a variable?" |
| **Easy** | Surface-level understanding with simple distinctions | "interface vs type in TS" |
| **Medium** | Applied knowledge — how and why, not just what | "How does DI work? What are service lifetimes?" |
| **Hard** | Deep internals, trade-offs, and system-level reasoning | "Explain the prototype chain and what `new` does" |
| **Expert** | Advanced type theory, performance edge cases, architecture | "How does `infer` work in conditional types?" |
