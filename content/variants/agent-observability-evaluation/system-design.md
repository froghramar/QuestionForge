---
id: variant.agent-observability-evaluation.system-design
question: question.agent-observability-evaluation
technology: tech.system-design
---
# Expected Answer
Trace model turns, state changes, tool selection, arguments, results, timing, and policy decisions using a correlation ID. Redact secrets and restrict trace access. Label incidents by retrieval, planning, arguments, tool output, or execution, then turn each into a replayable evaluation case.
# Why It Matters
Without traces, an agent failure is an unverifiable story rather than a fixable defect.
# Common Mistakes
- **Logging secrets:** Observability becomes a data breach.
- **Recording only final output:** The failing step cannot be located.
# Follow-up Questions
- **What makes a useful trace?** (Answer: Causal steps, inputs, outputs, and timing.)
- **How does an incident improve quality?** (Answer: It becomes a regression evaluation.)
