---
id: variant.structured-output-reliability.system-design
question: question.structured-output-reliability
technology: tech.system-design
---
# Expected Answer
I use schema-constrained output to reduce parsing failures, but treat it only as a proposal. Application code validates types, ranges, required relationships, supplier identity, and authorization before any payment action. A malformed result gets a bounded repair retry; an ambiguous or low-confidence invoice goes to review. This separates probabilistic extraction from deterministic financial control.
# Why It Matters
Valid JSON can still contain an incorrect account or amount.
# Common Mistakes
- **Trusting parsed JSON:** Parsing is not business validation.
- **Executing without review thresholds:** Uncertain model output becomes financial loss.
# Follow-up Questions
- **What follows failed validation?** (Answer: Repair retry or human review.)
- **Why separate execution?** (Answer: The model is not an authorization system.)
