---
id: question.vector-multitenant-isolation
title: "Vector Search: Tenant Isolation"
slug: vector-multitenant-isolation
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
This evaluates whether a candidate treats retrieval as a data-access boundary, not merely a search problem. Interviewers look for authorization enforced before context reaches the model, trustworthy metadata, defense in depth, and adversarial testing.
## Key Concepts
- **Authorization filter:** Enforce tenant and document permissions before returning context.
- **Defense in depth:** Validate access in the application even if the store supports filters.
- **Metadata integrity:** Index trusted access attributes with every vector.
- **Testing:** Include cross-tenant adversarial queries in evaluation.
## Question Variations
- "Why is prompt-only access control insufficient?"
- "When would separate indexes be preferable to filtered namespaces?"
- "How would you prevent cross-tenant retrieval leakage in a shared vector index?"
