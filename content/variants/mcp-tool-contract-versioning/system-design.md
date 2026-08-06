---
id: variant.mcp-tool-contract-versioning.system-design
question: question.mcp-tool-contract-versioning
technology: tech.system-design
---
# Expected Answer
Evolve tool schemas additively with optional fields and safe defaults. For a required semantic change, create a new versioned tool, support both during migration, measure usage, and deprecate deliberately. Validate requests at the server and return stable, machine-readable errors.
# Why It Matters
Tool clients update independently and a breaking schema can halt automated work.
# Common Mistakes
- **Making an old field required:** Existing clients fail immediately.
- **Changing a field's meaning:** Silent incorrect actions are worse than an error.
# Follow-up Questions
- **When add a tool?** (Answer: When compatibility cannot be preserved.)
- **How is retirement safe?** (Answer: Observe remaining version usage.)
