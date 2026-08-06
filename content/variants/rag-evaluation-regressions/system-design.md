---
id: variant.rag-evaluation-regressions.system-design
question: question.rag-evaluation-regressions
technology: tech.system-design
---
# Expected Answer
I would not use one end-to-end “answer quality” score, because it cannot tell the team what broke. First create a versioned evaluation set with real queries, the passages that should support each answer, acceptable answers, and cases where the assistant must decline. For every change, measure retrieval recall@k and ranking quality before measuring groundedness, correctness, citation accuracy, latency, and cost. Segment results: a chunking change may improve short FAQ queries while damaging table-heavy manuals.

If an answer regresses, inspect the trace in order: was the right document ingested, did retrieval return it, did reranking retain it, and did the model use it faithfully? That sequence separates an indexing defect from a retrieval defect or a generation defect. I would gate rollout on a baseline comparison, canary the change, and feed sampled production failures back into the evaluation set.
# Why It Matters
Without this separation, teams tune prompts for a problem caused by missing evidence, or change embeddings for a model-behavior problem. The result is expensive iteration with no reliable quality signal.
# Common Mistakes
- **Judging only fluent answers:** Fluent output can still be unsupported.
- **Using an unversioned test set:** Results cannot be reproduced after corpus changes.
# Follow-up Questions
- **What is retrieval recall at k?** (Answer: The fraction of queries whose required evidence appears in the top k results.)
- **How is online quality measured?** (Answer: Use sampled human review and telemetry, not clicks alone.)
