---
id: question.ts-unions-exhaustive
title: Discriminated Unions
slug: ts-discriminated-unions
difficulty: Medium
topic: topic.type-systems
concepts:
  - concept.structural-typing
estimated_time: 15
updated: 2026-08-01
---

## Why This Is Asked

Discriminated unions are one of TypeScript's most powerful patterns. Interviewers want to see if you can model domain state safely using union types and ensure compile-time exhaustiveness — a key skill for building maintainable, type-safe applications.

## Key Concepts

- A discriminated union is a union of types sharing a common literal property (the "discriminant" or "tag")
- TypeScript narrows the type in `switch`/`if` blocks based on the discriminant value
- Exhaustiveness checking via `never`: if a new variant is added, unhandled cases cause a compile error
- Preferred over enums for modeling state machines (e.g., `{ status: "loading" } | { status: "error", message: string }`)
- Works with `instanceof` narrowing for class hierarchies, but literal discriminants are more common in TS
