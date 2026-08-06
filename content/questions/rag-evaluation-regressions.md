---
id: question.rag-evaluation-regressions
title: "RAG: Catch Retrieval Regressions"
slug: rag-evaluation-regressions
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
Your RAG assistant's answers worsened after changing chunking. Design an offline and online evaluation plan that separates retrieval failures from generation failures.
## Key Concepts
- **Golden set:** Versioned queries, expected evidence, and judged answers.
- **Retrieval metrics:** Recall at k, ranking quality, and citation correctness.
- **Generation metrics:** Groundedness, correctness, and refusal behavior.
- **Release gates:** Compare against a baseline and investigate segmented regressions.
## Question Variations
- "How would you tell whether the retriever or LLM caused a bad answer?"
- "What belongs in a RAG evaluation dataset?"
