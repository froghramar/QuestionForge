---
id: concept.nextjs-metadata
title: Next.js Metadata API
slug: nextjs-metadata
topic: topic.nextjs-fundamentals
description: The modern way to define metadata (search engine optimization and social sharing) in the App Router.
---
# Next.js Metadata API

The Metadata API allows you to define metadata (e.g. `meta` and `link` tags inside your HTML `head` element) using a declarative object in your layouts or pages.

### Key Features
- **Static Metadata:** Export a `metadata` object from a layout or page.
- **Dynamic Metadata:** Export a `generateMetadata` function to fetch metadata based on dynamic parameters.
- **Inheritance:** Metadata is automatically merged from parent layouts to child pages, following a specific evaluation order.
- **File-based Metadata:** Support for special files like `favicon.ico`, `opengraph-image.png`, and `sitemap.xml`.
