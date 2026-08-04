---
id: question.rust-modules-and-visibility
title: Modules and Visibility
slug: rust-modules-and-visibility
difficulty: Medium
topic: topic.rust-fundamentals
concepts:
  - concept.rust-modules
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Module boundaries shape a Rust crate's maintainability and API safety. This question tests whether you can organize code around clear responsibilities and understand that privacy is the default rather than an afterthought.

## Key Concepts

- A crate is a compilation unit; modules organize names within it.
- Items are private by default to their parent module.
- `pub` exposes an item, while `pub(crate)` and `pub(super)` provide narrower visibility.
- `use` brings a path into scope but does not change visibility.

## Question Variations

- "What is the difference between a crate and a module?"
- "Does `use` make an item public?"
- "When would you prefer `pub(crate)` over `pub`?"
- "How does Rust's default privacy affect library design?"
