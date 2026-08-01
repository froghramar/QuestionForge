## Content Modeling

QuestionForge uses a relational Markdown model. Before adding or editing content, review `docs/ARCHITECTURE.md`.

### Core Rules
- **Stable IDs:** Always use IDs (e.g., `id: tech.dotnet`) for relationships in frontmatter.
- **Validation:** Run `npm run validate` (from the root) after any content change.
- **Hierarchy:** Category > Tech/Topic > Concept/Question > Variant.

## Development

When starting the dev server, use background mode:

```bash
npm run dev --prefix apps/website
```

## Documentation

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS v4](https://tailwindcss.com/docs/)
- [Pagefind Search](https://pagefind.app/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
