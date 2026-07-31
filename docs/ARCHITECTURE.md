# QuestionForge Architecture

## The Relational Markdown Model

QuestionForge treats a folder of Markdown files like a relational database. Relationships are established using **Stable IDs**.

### Entity Relationships

1.  **Category** (Root)
2.  **Technology** -> belongs to **Category**
3.  **Topic** -> belongs to **Category**
4.  **Concept** -> belongs to **Topic**
5.  **Question** -> belongs to **Topic**, references **Concepts** and **Companies**.
6.  **Variant** -> belongs to **Question**, references **Technology**.

### Stable IDs vs Slugs

*   **ID:** Immutable, unique identifier (e.g., `id: question.async-await`). Used for all internal links and validation.
*   **Slug:** Mutable, URL-friendly string (e.g., `slug: what-is-async-await`). Used only for routing.

### Why Question Variants?

Traditional interview sites duplicate questions for every language (e.g., "Async in C#" and "Async in JS" as separate entities). 

In QuestionForge:
*   The **Question** (`content/questions/`) defines the *prompt* and *context*.
*   The **Variant** (`content/variants/`) defines the *specific answer* for a technology.

This allows the UI to show a "Language Switcher" on a single question page, keeping the discussion unified while providing specific implementation details.

### Concepts: The Knowledge Base

Concepts are technology-agnostic (where possible) articles. A question about `async/await` and a question about `Promise.all` might both link to the `Asynchrony` concept. This keeps the explanations DRY and high-quality.

### Validation (`scripts/validate.js`)

The validation script performs:
1.  **Schema Check:** Required frontmatter fields.
2.  **Uniqueness Check:** No duplicate IDs or slugs.
3.  **Referential Integrity:** All referenced IDs must exist in their respective collections.
