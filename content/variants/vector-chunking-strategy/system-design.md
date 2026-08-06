---
id: variant.vector-chunking-strategy.system-design
question: question.vector-chunking-strategy
technology: tech.system-design
---
# Expected Answer
Chunk on semantic boundaries such as headings, paragraphs, tables, and code blocks, retaining parent title and source offsets. Use modest overlap only where sentences span a boundary. Store hierarchy and document version as metadata. Evaluate candidate recall and citation usefulness on queries requiring tables, code, and cross-section context; tune chunking empirically rather than selecting one token size globally.
# Why It Matters
Bad chunks either omit needed context or retrieve too much unrelated text.
# Common Mistakes
- **Splitting code mid-block:** The retrieved example becomes unusable.
- **Dropping heading metadata:** Matches lose their meaning and source context.
# Follow-up Questions
- **Why use overlap?** (Answer: To preserve meaning that crosses a chunk edge.)
- **How is chunking tested?** (Answer: Measure evidence recall on representative queries.)
