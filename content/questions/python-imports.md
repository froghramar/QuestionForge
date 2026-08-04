---
id: question.python-imports
title: Imports and Module Caching
slug: python-imports-and-module-caching
difficulty: Hard
topic: topic.python-fundamentals
concepts:
  - concept.python-imports
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Imports influence application startup, configuration, test isolation, and circular dependencies. This question tests whether you understand that modules are runtime objects with top-level side effects, not merely namespaces copied into each importing file.

## Key Concepts

- A module's top-level code usually executes only on its first import.
- Python stores loaded modules in `sys.modules`.
- `import module` binds the module object; `from module import name` binds the current object to a local name.
- Circular imports arise when modules need names before the other module has finished initialization.

## Question Variations

- "Does Python execute a module every time it is imported?"
- "What is the difference between `import settings` and `from settings import value`?"
- "Why do circular imports fail?"
- "How would you reduce import-time side effects?"
