---
id: variant.agent-planning-vs-workflows.system-design
question: question.agent-planning-vs-workflows
technology: tech.system-design
---
# Expected Answer
For fixed onboarding steps, I use a deterministic workflow because it is auditable and predictable. I introduce model judgment only for tasks like classifying unstructured requests or drafting a response. The agent has scoped tools, call and cost budgets, time limits, and approval gates for consequential actions. I measure completion, policy violations, cost, and human intervention before expanding autonomy.
# Why It Matters
Autonomy adds nondeterminism where predictable automation may be safer.
# Common Mistakes
- **Using an agent for a fixed checklist:** It adds risk without capability.
- **Unlimited tool loops:** Cost and side effects become unbounded.
# Follow-up Questions
- **Where does an agent help?** (Answer: Ambiguous reasoning and unstructured inputs.)
- **What bounds autonomy?** (Answer: Tool, time, cost, and approval limits.)
