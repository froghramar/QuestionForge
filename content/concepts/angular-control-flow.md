---
id: concept.angular-control-flow
title: Modern Control Flow
slug: angular-control-flow
topic: topic.angular-fundamentals
description: The new @if, @for, and @switch syntax in modern Angular.
---
# Modern Control Flow
Angular 17 introduced a new built-in syntax for control flow that replaces structural directives like `*ngIf`, `*ngFor`, and `*ngSwitch`.

Key advantages:
- **Performance:** Significant improvements in execution speed, especially for large lists.
- **Better Developer Experience:** More intuitive syntax that is closer to JavaScript/TypeScript.
- **Improved Type Checking:** Better integration with the Angular compiler for stricter type safety.
- **Zero Imports:** Built directly into the compiler, so you don't need to import `CommonModule` or individual directives in standalone components.
- **Enhanced Features:** Built-in support for empty list states (`@empty`) and mandatory tracking (`track`) for loops.
