---
id: variant.mcp-untrusted-tool-output.system-design
question: question.mcp-untrusted-tool-output
technology: tech.system-design
---
# Expected Answer
I treat search and tool output as untrusted content, even when it resembles an instruction. I prefer structured, schema-validated results with provenance, and the application decides what fields may be used. A result cannot expand the agent's tool set, bypass authorization, or remove confirmation requirements. I also limit chained calls and sensitive data exposure.
# Why It Matters
Indirect prompt injection commonly arrives through retrieved or tool-provided content.
# Common Mistakes
- **Executing instructions found in results:** Content has no authority.
- **Passing raw output into sensitive tools:** Validate fields and provenance first.
# Follow-up Questions
- **What stops chained abuse?** (Answer: Per-tool policy and bounded capabilities.)
- **Why schemas?** (Answer: They reduce ambiguous, instruction-like output.)
