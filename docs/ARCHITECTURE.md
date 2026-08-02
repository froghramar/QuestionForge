# QuestionForge Architecture

## The Relational Markdown Model

QuestionForge treats a folder of Markdown files like a relational database. Relationships are established using **Stable IDs**.

### Entity Relationships

1.  **Category** (Root)
2.  **Technology** -> belongs to **Category**
3.  **Topic** -> belongs to **Category**
4.  **Concept** -> belongs to **Topic**
5.  **Question** -> belongs to **Topic**, references **Concepts**.
6.  **Variant** -> belongs to **Question**, references **Technology**.
7.  **Path** -> references multiple **Topics**.

### Scaling Strategy (Thousands of Questions)

To handle thousands of questions while maintaining a fast, static-first experience:

*   **Discovery Dashboard (Home):** The home page surfaces only high-level paths and recently added items, rather than the full list.
*   **Astro Pagination:** The catalog (`/questions`) is paginated at build time to prevent DOM bloat and keep page sizes constant.
*   **Pagefind Search:** Global search is decoupled from the UI state. Pagefind builds a static search index after the site build, allowing sub-millisecond searching across the entire catalog without loading all data into the browser.

### Stable IDs vs Slugs

*   **ID:** Immutable, unique identifier (e.g., `id: question.async-await`). Used for all internal links and validation.
*   **Slug:** Mutable, URL-friendly string (e.g., `slug: what-is-async-await`). Used only for routing.

### Hybrid Dynamic Layer (Supabase)

While the content catalog is static, QuestionForge uses **Supabase** to provide dynamic features for users:
*   **Authentication:** Managed via Supabase Auth (GitHub and Google OAuth).
*   **Bookmarks:** User-specific bookmarks are stored in Supabase, linked to the **Stable ID** of the question.
*   **Progress Tracking:** (Future) Tracking which questions a user has mastered.

The dynamic layer is implemented entirely on the client side to maintain the benefits of a static site (fast initial load, SEO) while providing personalized features.

#### Database Schema

The database schema, including tables and Row-Level Security (RLS) policies, is managed via **Supabase Migrations**. The source of truth resides in the `/supabase/migrations` directory at the project root.

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
