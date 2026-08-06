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
A policy assistant must answer only from current policy documents and show users evidence. Explain ingestion freshness, source metadata, retrieval filtering, and abstention when evidence is missing.
## Key Concepts
- **Metadata:** Version, effective date, source URL, and access scope travel with chunks.
- **Freshness:** Invalidate or re-index replaced documents and expose index lag.
- **Grounding:** Require citations tied to retrieved chunks.
- **Abstention:** Decline answers when retrieval confidence or evidence is insufficient.
## Question Variations
- "How do you prevent answers from citing superseded policy?"
- "When should a RAG assistant say it does not know?"
