---
id: question.vector-index-rebuild
title: "Vector Search: Re-embed Safely"
slug: vector-index-rebuild
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
This tests whether a candidate can operate an embedding migration as a safe production rollout. Interviewers assess versioning, backfill completeness, shadow evaluation, gradual cutover, and rollback rather than a risky in-place rebuild.
## Key Concepts
- **Versioning:** Store embedding model and chunker version with each vector.
- **Dual read/write:** Build a new index while serving the proven one.
- **Evaluation:** Compare retrieval quality and latency before traffic migration.
- **Rollback:** Keep the previous index available until the new path is proven.
## Question Variations
- "Why should embeddings be versioned?"
- "How would you roll back a bad embedding migration?"
- "How would you upgrade embeddings for millions of documents without disrupting search?"
