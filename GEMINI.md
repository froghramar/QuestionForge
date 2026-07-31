# QuestionForge - Gemini CLI Instructions

You are an expert software engineer working on **QuestionForge**, an open-source interview knowledge base.

## Core Mandates
* **Static First:** QuestionForge is a static site. Avoid any backend logic, APIs, or databases. Git is the database.
* **Content is King:** Markdown (MDX) is the CMS. Ensure all content follows the established structure in the README.
* **Tech Stack:** Astro, React, TypeScript, Tailwind CSS. Use Vanilla CSS where possible, but Tailwind is approved for this project.
* **Navigation:** Maintain breadcrumbs and a clear hierarchy (Home > Category > Topic > Question).

## Architecture
* **Apps:** The main website is located in `apps/website`.
* **Content:** All interview content is stored in the `content/` directory.
    * `content/questions/`: The actual interview questions.
    * `content/companies/`: Company-specific metadata/paths.
    * `content/topics/`: Topic definitions.
    * `content/learning-paths/`: Curated sets of questions.
* **Search:** Use `pagefind` for client-side search.

## Standards
* All questions must include the standard frontmatter: `title`, `slug`, `difficulty`, `category`, `tags`, `companies`, `estimated_time`, `updated`.
* Use React only for interactive components (e.g., search, filters). Prefer Astro components for static parts.
* Follow the quality checklist in `README.md` for every question.
