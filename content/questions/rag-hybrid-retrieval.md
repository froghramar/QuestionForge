---
id: question.rag-hybrid-retrieval
title: "RAG: Hybrid Retrieval Trade-offs"
slug: rag-hybrid-retrieval
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
This tests whether a candidate can choose retrieval techniques based on query behavior instead of treating vector search as a universal replacement for keyword search. Interviewers look for a reasoned hybrid pipeline, ranking trade-offs, and latency-aware evaluation.
## Key Concepts
- **Lexical search:** Preserves exact identifiers and rare terms.
- **Vector search:** Matches semantic intent beyond exact wording.
- **Fusion and reranking:** Combine candidate sets before expensive ranking.
- **Latency:** Measure each stage and use bounded candidate counts.
## Question Variations
- "Why does vector-only retrieval fail for error codes?"
- "Where would you place a cross-encoder reranker?"
- "Design search for support queries containing both product IDs and natural-language descriptions."
