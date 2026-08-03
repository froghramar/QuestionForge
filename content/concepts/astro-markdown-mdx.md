---
id: concept.astro-markdown-mdx
title: Markdown & MDX Extensibility
slug: astro-markdown-mdx
topic: topic.astro-fundamentals
description: Customizing content processing with Remark, Rehype, and MDX components.
---
# Markdown & MDX Extensibility
Astro provides a powerful pipeline for content. Beyond basic Markdown, you can extend functionality using two types of plugins:

### Remark & Rehype
- **Remark**: Plugins that transform the Markdown AST (e.g., adding a table of contents).
- **Rehype**: Plugins that transform the HTML AST (e.g., adding IDs to headings or lazy-loading images).

### MDX
MDX allows you to use Astro components (or framework islands) directly inside your Markdown files, enabling rich interactive content.
