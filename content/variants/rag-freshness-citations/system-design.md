---
id: variant.rag-freshness-citations.system-design
question: question.rag-freshness-citations
technology: tech.system-design
---
# Expected Answer
I would make provenance part of the retrieval contract, not a formatting feature. Every chunk carries a stable source ID, version, effective dates, canonical URL, and access policy. The ingestion pipeline detects replacements and revocations, marks old chunks ineligible, and reports index lag. At query time, authorization and current-version filters run before ranking, so unauthorized or superseded content never enters the model context.

The answer service should retain the chunk IDs used for each claim and render citations from those IDs. If retrieval cannot find current, authorized evidence—or sources disagree—the correct behavior is a bounded answer such as “I could not verify this from current policy,” with an escalation path. I would test document replacement, deletion, and permission changes explicitly.
# Why It Matters
Freshness failures look persuasive to users because the language model can explain obsolete text fluently. Provenance and abstention make the system reviewable instead of merely plausible.
# Common Mistakes
- **Filtering after generation:** Unauthorized or stale context may already influence the answer.
- **Treating citations as decoration:** They must resolve to the exact retrieved evidence.
# Follow-up Questions
- **What causes stale answers?** (Answer: Index lag, failed deletions, and missing validity filters.)
- **When should it abstain?** (Answer: When no authorized, current evidence supports the claim.)
