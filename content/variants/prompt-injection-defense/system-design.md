---
id: variant.prompt-injection-defense.system-design
question: question.prompt-injection-defense
technology: tech.system-design
---
# Expected Answer
Treat email and retrieved text as untrusted data, minimize available tools and context, and enforce authorization outside the model. Require confirmation for sensitive actions and continuously test direct and indirect injection cases. Prompts guide behavior but cannot be the security boundary.
# Why It Matters
Hostile text can manipulate a model that has access to customer tools.
# Common Mistakes
- **Relying on system-prompt wording:** It cannot guarantee safety.
- **Giving broad tools by default:** Injection gains unnecessary capability.
# Follow-up Questions
- **What is indirect injection?** (Answer: Hostile instructions delivered through external content.)
- **What enforces safety?** (Answer: Server-side policy and scoped tools.)
