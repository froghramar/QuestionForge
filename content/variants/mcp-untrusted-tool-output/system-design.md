---
id: variant.mcp-untrusted-tool-output.system-design
question: question.mcp-untrusted-tool-output
technology: tech.system-design
---
# Expected Answer
Treat every tool result as untrusted data. Validate structured output against a schema, preserve provenance, and prevent returned text from changing tool permissions or policy. Server-side authorization and confirmation remain mandatory for every downstream call. Limit accessible tools and chain depth.
# Why It Matters
Indirect prompt injection commonly arrives through retrieved or tool-provided content.
# Common Mistakes
- **Executing instructions found in results:** Content has no authority.
- **Passing raw output into sensitive tools:** Validate fields and provenance first.
# Follow-up Questions
- **What stops chained abuse?** (Answer: Per-tool policy and bounded capabilities.)
- **Why schemas?** (Answer: They reduce ambiguous, instruction-like output.)
