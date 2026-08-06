---
id: question.rag-freshness-citations
title: "RAG: Fresh Sources and Citations"
slug: rag-freshness-citations
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
This assesses whether a candidate can make a RAG system trustworthy when source documents change. Interviewers evaluate provenance, freshness controls, access filtering, citations, and the ability to abstain rather than invent an answer.
## Key Concepts
- **Metadata:** Version, effective date, source URL, and access scope travel with chunks.
- **Freshness:** Invalidate or re-index replaced documents and expose index lag.
- **Grounding:** Require citations tied to retrieved chunks.
- **Abstention:** Decline answers when retrieval confidence or evidence is insufficient.
## Question Variations
- "How do you prevent answers from citing superseded policy?"
- "When should a RAG assistant say it does not know?"
- "Design a policy assistant that cites only current, authorized documents."
