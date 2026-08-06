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
Semantic search misses exact product IDs, while keyword search misses paraphrased questions. Design a hybrid retrieval and reranking pipeline within a fixed latency budget.
## Key Concepts
- **Lexical search:** Preserves exact identifiers and rare terms.
- **Vector search:** Matches semantic intent beyond exact wording.
- **Fusion and reranking:** Combine candidate sets before expensive ranking.
- **Latency:** Measure each stage and use bounded candidate counts.
## Question Variations
- "Why does vector-only retrieval fail for error codes?"
- "Where would you place a cross-encoder reranker?"
