---
id: question.astro-integrations
title: Extending Astro with Integrations
slug: astro-integrations
difficulty: Expert
topic: topic.astro-fundamentals
concepts:
  - concept.astro-integration-api
estimated_time: 25
updated: 2026-08-03
---

## Why This Is Asked
This is a high-level question for senior developers. It tests your understanding of the framework's internals and your ability to customize the build process or toolchain.

## Key Concepts
- **Integration Structure**: An object with a `name` and a set of `hooks`.
- **`astro:config:setup`**: The most common hook for adding Vite plugins or updating the Astro config.
- **Scoped Styles**: How Astro's internal style integration works.
- **Virtual Modules**: Using integrations to inject code that doesn't exist on the file system.

## Question Variations
- "How would you build an integration to automatically generate a sitemap?"
- "Explain the difference between an Astro Integration and a Vite Plugin."
- "How do you inject a global script into every page using an integration?"
- "What is the benefit of using an integration over a simple middleware?"
---
