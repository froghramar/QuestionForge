---
id: variant.structured-output-reliability.system-design
question: question.structured-output-reliability
technology: tech.system-design
---
# Expected Answer
Request schema-constrained output, then validate syntax, types, ranges, business rules, and authorization outside the model. Retry bounded repairs for malformed output; route uncertain invoices to review. Extraction proposes data, never authorizes payment.
# Why It Matters
Valid JSON can still contain an incorrect account or amount.
# Common Mistakes
- **Trusting parsed JSON:** Parsing is not business validation.
- **Executing without review thresholds:** Uncertain model output becomes financial loss.
# Follow-up Questions
- **What follows failed validation?** (Answer: Repair retry or human review.)
- **Why separate execution?** (Answer: The model is not an authorization system.)
