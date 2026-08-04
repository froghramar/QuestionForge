---
id: concept.rust-async
title: Rust Async Programming
slug: rust-async-programming
topic: topic.rust-fundamentals
description: Futures, executors, and cooperative asynchronous I/O in Rust.
---
# Rust Async Programming

An `async` function returns a lazy future that does nothing until it is polled by an executor. `await` yields when a future cannot make progress, allowing the executor to run other ready tasks.
