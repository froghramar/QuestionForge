---
id: variant.vector-index-rebuild.system-design
question: question.vector-index-rebuild
technology: tech.system-design
---
# Expected Answer
Version embeddings by model and chunker. Backfill a new index while the old index serves traffic, dual-write new documents, and compare retrieval quality, latency, cost, and authorization behavior on a golden set and shadow traffic. Shift traffic gradually behind a feature flag and retain the old index for rollback until freshness is proven. Reconciliation ensures every current source has a new-version vector.
# Why It Matters
An embedding migration can silently degrade search for the whole corpus.
# Common Mistakes
- **In-place overwrite:** There is no safe rollback or comparison.
- **Skipping backfill reconciliation:** Some documents remain searchable only in the old index.
# Follow-up Questions
- **Why version embeddings?** (Answer: Model changes alter vector meaning.)
- **How is rollback done?** (Answer: Route reads back to the retained prior index.)
