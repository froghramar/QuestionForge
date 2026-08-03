---
id: concept.astro-testing
title: Testing & The Container API
slug: astro-testing
topic: topic.astro-fundamentals
description: Strategies for unit testing and integration testing Astro applications.
---
# Testing & The Container API
Testing `.astro` components has historically been difficult because they only run in the Astro environment.

### The Container API
Astro provides a **Container API** that allows you to render `.astro` components in isolation for unit testing. You can pass props and slots and inspect the resulting HTML.

### Integration Testing
For end-to-end testing, tools like **Playwright** or **Cypress** are recommended, as they test the final output of the build or the dev server.
---
