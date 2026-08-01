# QuestionForge

## Vision

QuestionForge is the Wikipedia of technical interview knowledge. It is a community-driven, static-first, and offline-friendly platform for mastering software engineering interviews.

---

# Principles

* **Static First:** No databases or APIs. Git is the single source of truth.
* **Content Portability:** All content is written in Markdown (MDX) with strict schema validation.
* **Stable IDs:** Every entity (Category, Tech, Topic, Question, etc.) has a unique, stable ID for referential integrity.
* **No Duplication:** Use **Concepts** for reusable knowledge and **Variants** for technology-specific answers to the same question.

---

# Content Hierarchy

```text
Category (e.g., Backend)
   └── Technology (e.g., .NET, Node.js)
   └── Topic (e.g., Async Programming)
          └── Concept (e.g., Asynchrony) -> Reusable Article
          └── Question (e.g., What is async/await?) -> The Prompt
                 └── Variant (e.g., .NET Answer) -> Stack-specific detail
                 └── Variant (e.g., JS Answer)
```

---

# Repository Structure

* `apps/website`: The Astro-based frontend.
* `content/`: The "Database" of the project.
    * `categories/`: High-level navigation.
    * `technologies/`: Languages and frameworks.
    * `topics/`: Groupings of concepts and questions.
    * `concepts/`: Deep-dive knowledge articles.
    * `questions/`: Interview prompts (language agnostic).
    * `variants/`: Implementation-specific answers.
    * `paths/`: Curated learning tracks.
* `scripts/`: Validation and maintenance tools.
* `docs/`: Architectural and contribution guides.

---

# Contribution Workflow

1.  **Validate:** Always run `npm run validate` before committing.
2.  **Test Search:** Search requires a build. Run `npm run build && npm run preview` in `apps/website` to test global search.
3.  **Referential Integrity:** Ensure your new content correctly references existing IDs.
4.  **DRY:** If you're explaining a core concept, check if a `concept/` file should be created or updated instead of putting it all in a `question/`.

---

# Tech Stack

* Astro (Static Site Generation)
* React (Interactive Components)
* Tailwind CSS (Styling)
* TypeScript (Type Safety)
* Pagefind (Client-side Search)
