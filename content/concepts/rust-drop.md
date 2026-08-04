---
id: concept.rust-drop
title: Rust Drop and RAII
slug: rust-drop-and-raii
topic: topic.rust-fundamentals
description: Deterministic cleanup when owned values leave scope.
---
# Rust Drop and RAII

Rust releases owned resources deterministically when a value leaves scope. Types can implement `Drop` for cleanup, and ownership transfer makes resource lifetime explicit without a garbage collector.
