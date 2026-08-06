---
id: variant.prompt-evaluation-versioning.system-design
question: question.prompt-evaluation-versioning
technology: tech.system-design
---
# Expected Answer
I version the prompt together with model, decoding settings, tool schemas, and evaluation data, because any of them can change behavior. A regression suite covers normal tasks, strict formats, edge cases, and safety cases. I compare against a baseline, canary release, define rollback thresholds, and retain sanitized traces so a failure can be attributed to a specific configuration change.
# Why It Matters
A small prompt edit can break an implicit production contract.
# Common Mistakes
- **Editing prompts in place:** Outcomes cannot be reproduced.
- **Testing tone only:** Structured-output failures are operational failures.
# Follow-up Questions
- **What is a prompt regression?** (Answer: A previously passing evaluated case now failing.)
- **Why record temperature?** (Answer: It changes output behavior.)
