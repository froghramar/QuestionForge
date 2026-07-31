# QuestionForge - Gemini CLI Instructions

You are an expert software engineer working on **QuestionForge**.

## Core Mandates
* **Static First:** No backend, no APIs. Git is the database.
* **Stable IDs:** Use stable IDs (e.g., `id: question.async-await`). **NEVER** use slugs for relationships; slugs are for URLs only.
* **Referential Integrity:** The build/validation MUST fail if any ID reference is broken.
* **DRY Architecture:**
    * **Concepts:** Use for reusable technical explanations.
    * **Questions:** Use for the interview prompt itself.
    * **Variants:** Use for technology-specific answers (e.g., .NET vs Python implementation).

## Content Modeling Strategy
When adding content:
1.  **Identify the Category/Topic/Tech:** Ensure they exist or create them.
2.  **Concept vs Question:** If the info is a reusable explanation, put it in `concepts/`. If it's a specific prompt, put it in `questions/`.
3.  **Variant Creation:** If a question has different answers for different stacks (e.g., "How do you handle DI?"), create a generic `question/` and multiple `variants/`.

## Architecture & Validation
* **Astro:** Use `content.config.ts` for schema enforcement.
* **Scripts:** `scripts/validate.js` is the source of truth for referential integrity across collections.
* **Directory Structure:**
    * `content/categories/`, `content/technologies/`, `content/topics/`, `content/concepts/`, `content/questions/`, `content/variants/`, `content/companies/`.

## Quality Standards
* Every `variant/` must include: `Expected Answer`, `Common Mistakes`, and `Follow-up Questions`.
* Difficulty levels: `Beginner`, `Easy`, `Medium`, `Hard`, `Expert`.
