---
id: concept.angular-selectorless-components
title: Selectorless Components
slug: angular-selectorless-components
topic: topic.angular-fundamentals
description: Modern component consumption without string selectors.
---
# Selectorless Components
Introduced in Angular 22, selectorless components allow you to import and use components directly in templates via their class names, bypassing the need for a string-based `selector`.

Benefits:
- **Refactoring Safety:** Renaming a component class automatically updates all usages in IDEs.
- **Improved Tooling:** Better integration with TypeScript language services and AI assistants.
- **Simpler Templates:** Reduces the mental overhead of mapping class names to kebab-case selectors.
- **Stricter Typing:** Ensures that only valid, imported components are used in the template.
