---
id: variant.vector-chunking-strategy.system-design
question: question.vector-chunking-strategy
technology: tech.system-design
---
# Expected Answer
I would preserve document structure first: split at headings and coherent paragraphs, keep tables and code blocks intact, and attach parent heading, source offsets, version, and permissions. Overlap is a small continuity aid, not a substitute for meaningful boundaries. Then test chunk sizes on real questions that require tables, code, and cross-section context; choose the configuration that improves evidence recall without flooding the prompt with unrelated text.
# Why It Matters
Bad chunks either omit needed context or retrieve too much unrelated text.
# Common Mistakes
- **Splitting code mid-block:** The retrieved example becomes unusable.
- **Dropping heading metadata:** Matches lose their meaning and source context.
# Follow-up Questions
- **Why use overlap?** (Answer: To preserve meaning that crosses a chunk edge.)
- **How is chunking tested?** (Answer: Measure evidence recall on representative queries.)
