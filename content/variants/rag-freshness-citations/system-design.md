---
id: variant.rag-freshness-citations.system-design
question: question.rag-freshness-citations
technology: tech.system-design
---
# Expected Answer
Attach source ID, version, effective date, URL, access policy, and chunk hash to every embedding. Ingestion detects changed or revoked documents, deletes or disables old chunks, and reports index lag. Retrieval filters by authorization and current/effective versions before ranking. Require the response layer to cite the returned chunk IDs and refuse or escalate when evidence is absent, stale, or contradictory. Test replacements and revocations as first-class evaluation cases.
# Why It Matters
An assistant that confidently quotes superseded policy creates compliance risk.
# Common Mistakes
- **Filtering after generation:** Unauthorized or stale context may already influence the answer.
- **Treating citations as decoration:** They must resolve to the exact retrieved evidence.
# Follow-up Questions
- **What causes stale answers?** (Answer: Index lag, failed deletions, and missing validity filters.)
- **When should it abstain?** (Answer: When no authorized, current evidence supports the claim.)
