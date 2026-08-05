---
id: question.spring-boot-caching
title: Spring Boot Caching
slug: spring-boot-caching
difficulty: Hard
topic: topic.spring-boot-fundamentals
estimated_time: 20
updated: 2026-08-05
---
## Why This Is Asked
Caching annotations are concise, but their correctness depends on keys, invalidation, proxying, and distributed deployment behavior.
## Key Concepts
- `@Cacheable` reuses a value based on a cache key.
- `@CacheEvict` and `@CachePut` support deliberate mutation policies.
- Self-invocation bypasses proxy-based cache annotations.
- A multi-instance application needs a shared cache when consistency requires it.
## Question Variations
- "Why does `@Cacheable` sometimes appear not to run?"
- "How should cache invalidation relate to writes?"
- "When is a local cache unsafe in a distributed service?"
