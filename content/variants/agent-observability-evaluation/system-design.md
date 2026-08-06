---
id: variant.agent-observability-evaluation.system-design
question: question.agent-observability-evaluation
technology: tech.system-design
---
# Expected Answer
I trace each model turn, state transition, selected tool, validated arguments, result, policy decision, and timing under one correlation ID. Traces are redacted and access controlled. When an incident occurs, I label the failing stage—retrieval, planning, argument construction, tool result, or execution—then add a sanitized replay case to the evaluation suite. That turns incidents into measurable regressions instead of anecdotes.
# Why It Matters
Without traces, an agent failure is an unverifiable story rather than a fixable defect.
# Common Mistakes
- **Logging secrets:** Observability becomes a data breach.
- **Recording only final output:** The failing step cannot be located.
# Follow-up Questions
- **What makes a useful trace?** (Answer: Causal steps, inputs, outputs, and timing.)
- **How does an incident improve quality?** (Answer: It becomes a regression evaluation.)
