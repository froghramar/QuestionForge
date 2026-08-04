---
id: concept.rust-errors
title: Rust Error Handling
slug: rust-error-handling
topic: topic.rust-fundamentals
description: Recoverable Result errors, optional Option values, and exceptional panics.
---
# Rust Error Handling

Rust represents recoverable failures with `Result<T, E>` and absent optional values with `Option<T>`. Panics are generally reserved for broken invariants or unrecoverable failures rather than ordinary control flow.
