---
id: variant.rag-evaluation-regressions.system-design
question: question.rag-evaluation-regressions
technology: tech.system-design
---
# Expected Answer
Build a versioned golden set containing user queries, expected source passages, acceptable answers, and known refusal cases. Measure retrieval recall at k and citation support separately from groundedness and answer correctness. Run every chunking, embedding, retrieval, prompt, and model change against the baseline; segment results by document type and query class. In production, sample judged traces and monitor citation coverage, no-answer rate, latency, and feedback. A regression is investigated by first checking whether the expected evidence appeared in candidates, then whether the model used it correctly.
# Why It Matters
End-to-end quality scores hide whether a change broke search or generation.
# Common Mistakes
- **Judging only fluent answers:** Fluent output can still be unsupported.
- **Using an unversioned test set:** Results cannot be reproduced after corpus changes.
# Follow-up Questions
- **What is retrieval recall at k?** (Answer: The fraction of queries whose required evidence appears in the top k results.)
- **How is online quality measured?** (Answer: Use sampled human review and telemetry, not clicks alone.)
