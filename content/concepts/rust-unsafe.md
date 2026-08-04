---
id: concept.rust-unsafe
title: Rust Unsafe Code
slug: rust-unsafe-code
topic: topic.rust-fundamentals
description: Narrowly scoped operations requiring manually upheld memory-safety invariants.
---
# Rust Unsafe Code

`unsafe` permits a small set of operations the compiler cannot fully verify, such as dereferencing raw pointers. It does not disable Rust's safety model; developers must document and uphold the invariants that make the unsafe operation sound.
