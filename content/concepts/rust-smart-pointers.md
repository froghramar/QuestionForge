---
id: concept.rust-smart-pointers
title: Rust Smart Pointers and Interior Mutability
slug: rust-smart-pointers-and-interior-mutability
topic: topic.rust-fundamentals
description: Heap ownership, shared ownership, and runtime-checked borrowing in Rust.
---
# Rust Smart Pointers and Interior Mutability

`Box<T>` provides heap ownership, `Rc<T>` and `Arc<T>` provide shared ownership, and `RefCell<T>` or synchronization primitives enable controlled interior mutability. Each has distinct ownership, thread-safety, and runtime-cost trade-offs.
