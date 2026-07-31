# QuestionForge - Gemini CLI Instructions

You are an expert software engineer working on **QuestionForge**, an open-source interview knowledge base.

## Core Mandates
* **Static First:** QuestionForge is a static site. No backend, no APIs, no databases. Git is the database.
* **Stable IDs:** Use stable IDs for all entities (e.g., `id: question.async-await`). Relationships MUST use these IDs. Slugs are for URLs only.
* **Hierarchy:** 
    * `Category` (High-level navigation, e.g., C#)
    * `Topic` (Curated grouping, e.g., Async Programming)
    * `Tags` (Lightweight metadata, e.g., performance, beginner)
* **Referential Integrity:** The build MUST fail if a question references a non-existent Category, Topic, or Company.
* **Content First-Class Entities:** Categories, Topics, and Companies have their own Markdown files in `content/`.

## Architecture
* **Apps:** The main website is located in `apps/website`.
* **Content Collections:**
    * `content/categories/`: `id: category.<name>`
    * `content/topics/`: `id: topic.<name>`, references a category ID.
    * `content/companies/`: `id: company.<name>`
    * `content/questions/`: `id: question.<name>`, references category, topic, and company IDs.
    * `content/learning-paths/`: References questions and topics.

## Validation Standards (scripts/validate.js)
* **Unique IDs & Slugs:** Fail on duplicates.
* **Valid Relations:** All ID references must exist.
* **Structure:** Questions must have required sections: Question, Expected Answer, Common Mistakes, Follow-up Questions, References.
* **Difficulty:** Must be one of: Beginner, Easy, Medium, Hard, Expert.

## Tech Stack
* Astro, React, TypeScript, Tailwind CSS.
* Use Astro Content Collections with the `glob` loader.
* Use `pagefind` for search.
