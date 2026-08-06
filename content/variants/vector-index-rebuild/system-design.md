---
id: variant.vector-index-rebuild.system-design
question: question.vector-index-rebuild
technology: tech.system-design
---
# Expected Answer
Treat an embedding change like a schema migration. Version the model and chunker, build a new index while serving the old one, dual-write new documents, and reconcile backfill completeness. Compare both paths on a golden set and shadow traffic for recall, latency, cost, and permission behavior. Shift traffic gradually behind a flag and keep the old index until rollback is no longer needed.
# Why It Matters
An embedding migration can silently degrade search for the whole corpus.
# Common Mistakes
- **In-place overwrite:** There is no safe rollback or comparison.
- **Skipping backfill reconciliation:** Some documents remain searchable only in the old index.
# Follow-up Questions
- **Why version embeddings?** (Answer: Model changes alter vector meaning.)
- **How is rollback done?** (Answer: Route reads back to the retained prior index.)
