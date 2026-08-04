---
id: concept.rust-ownership
title: Rust Ownership and Borrowing
slug: rust-ownership-and-borrowing
topic: topic.rust-fundamentals
description: Ownership, borrowing, and lifetimes that enforce memory safety without garbage collection.
---
# Rust Ownership and Borrowing

Every Rust value has one owner. References borrow a value without taking ownership, and the compiler ensures borrowed references remain valid while preventing conflicting mutation.
