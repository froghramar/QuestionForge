---
id: variant.agent-planning-vs-workflows.system-design
question: question.agent-planning-vs-workflows
technology: tech.system-design
---
# Expected Answer
Use deterministic workflows for fixed, policy-critical onboarding steps. Introduce model judgment only for ambiguous classification, drafting, or information gathering, with scoped tools, budgets, and approvals. Evaluate task completion, cost, violations, and human intervention before increasing autonomy.
# Why It Matters
Autonomy adds nondeterminism where predictable automation may be safer.
# Common Mistakes
- **Using an agent for a fixed checklist:** It adds risk without capability.
- **Unlimited tool loops:** Cost and side effects become unbounded.
# Follow-up Questions
- **Where does an agent help?** (Answer: Ambiguous reasoning and unstructured inputs.)
- **What bounds autonomy?** (Answer: Tool, time, cost, and approval limits.)
