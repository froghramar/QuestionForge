---
id: question.ts-infer-keyword
title: The infer Keyword
slug: ts-infer-keyword-usage
difficulty: Expert
topic: topic.type-systems
companies:
  - company.stripe
  - company.google
estimated_time: 15
updated: 2026-08-01
---

## Why This Is Asked

`infer` is an advanced conditional type feature that separates TypeScript power users from casual users. Interviewers use this to assess whether you can build utility types, understand conditional type mechanics, and read complex generic signatures in library code.

## Key Concepts

- `infer` declares a type variable within the `extends` clause of a conditional type, capturing a sub-type
- The inferred variable is only available in the `true` branch of the conditional
- Powers built-in utility types: `ReturnType<T>`, `Parameters<T>`, `Awaited<T>`, `InstanceType<T>`
- Can extract types from any position: function return types, promise inner types, array element types, tuple positions
- Advanced: multiple `infer` positions, recursive conditional types, template literal type extraction
