---
id: question.cpp-memory-model
title: Memory Model and Data Races
slug: cpp-memory-model-and-data-races
difficulty: Expert
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-memory-model
estimated_time: 20
updated: 2026-08-04
---

## Why This Is Asked

Concurrency bugs in C++ can be undefined behavior rather than merely inconsistent results. This question tests whether you can identify a data race, use synchronization to establish visibility, and avoid reaching for atomics when a mutex gives a clearer correct design.

## Key Concepts

- A data race is conflicting unsynchronized access to the same non-atomic memory from multiple threads.
- A data race is undefined behavior in C++.
- Mutex lock/unlock operations establish synchronization between threads.
- Atomics support low-level synchronization with explicit memory-order trade-offs.

## Question Variations

- "What is a data race in C++ and why is it serious?"
- "When should you use a mutex versus `std::atomic`?"
- "What does acquire-release ordering provide?"
- "Does `volatile` make a shared variable thread-safe?"
