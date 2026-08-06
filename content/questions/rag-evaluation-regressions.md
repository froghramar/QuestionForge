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
This tests whether a candidate can make RAG quality measurable and diagnose regressions rather than judging answers by fluency. Interviewers look for separate retrieval and generation evaluation, a representative corpus, and release decisions based on evidence.
## Key Concepts
- **Golden set:** Versioned queries, expected evidence, and judged answers.
- **Retrieval metrics:** Recall at k, ranking quality, and citation correctness.
- **Generation metrics:** Groundedness, correctness, and refusal behavior.
- **Release gates:** Compare against a baseline and investigate segmented regressions.
## Question Variations
- "How would you tell whether the retriever or LLM caused a bad answer?"
- "What belongs in a RAG evaluation dataset?"
- "A chunking change reduced answer quality. How would you isolate and prevent the regression?"
