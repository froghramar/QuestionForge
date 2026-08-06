---
id: question.structured-output-reliability
title: Reliable Structured LLM Output
slug: structured-output-reliability
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
This tests whether a candidate can turn probabilistic model output into a safe systems boundary. Interviewers assess schema constraints, independent business validation, failure handling, and human-review thresholds.
## Key Concepts
- **Schema:** Request machine-readable output with explicit types and enums.
- **Validation:** Validate syntactic and business rules outside the model.
- **Recovery:** Retry bounded repair attempts, then route uncertain cases for review.
- **Separation:** Extraction output is a proposal, not authorization to execute.
## Question Variations
- "What should happen when JSON parses but violates business rules?"
- "Why is a schema not sufficient validation?"
- "How would you use LLM invoice extraction without allowing uncertain output to trigger a payment?"
