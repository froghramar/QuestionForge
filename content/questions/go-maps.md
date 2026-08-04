---
id: question.go-maps
title: Maps and Safe Access
slug: go-maps-and-safe-access
difficulty: Medium
topic: topic.go-fundamentals
concepts:
  - concept.go-maps
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Maps are a basic Go collection, but zero-value lookups and concurrency restrictions cause frequent production bugs. This question checks whether you can write correct presence checks and choose an appropriate strategy for shared access.

## Key Concepts

- Map keys must be comparable; slices, maps, and functions cannot be map keys.
- Reading an absent key returns the value type's zero value.
- The comma-ok form reports whether a key was present.
- Concurrent map writes, or a read concurrent with a write, require synchronization.

## Question Variations

- "How do you distinguish a missing map key from a stored zero value?"
- "Which types can be Go map keys?"
- "Is it safe to read and write a map from different goroutines?"
- "What happens when you read from a nil map?"
