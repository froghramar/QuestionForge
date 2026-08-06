---
id: variant.prompt-evaluation-versioning.system-design
question: question.prompt-evaluation-versioning
technology: tech.system-design
---
# Expected Answer
Version prompts with model, tool schema, decoding settings, and evaluation data. Run a regression suite covering normal, formatting, edge, and safety cases; release with canaries and rollback thresholds. Record sanitized traces and outcomes so regressions are attributable.
# Why It Matters
A small prompt edit can break an implicit production contract.
# Common Mistakes
- **Editing prompts in place:** Outcomes cannot be reproduced.
- **Testing tone only:** Structured-output failures are operational failures.
# Follow-up Questions
- **What is a prompt regression?** (Answer: A previously passing evaluated case now failing.)
- **Why record temperature?** (Answer: It changes output behavior.)
