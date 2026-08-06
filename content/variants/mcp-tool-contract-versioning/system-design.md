---
id: variant.mcp-tool-contract-versioning.system-design
question: question.mcp-tool-contract-versioning
technology: tech.system-design
---
# Expected Answer
I evolve tools additively where possible: optional fields and safe defaults preserve existing clients. If a new project field changes semantics and must be required, I expose a new versioned tool, support both versions during migration, validate at the server, and use telemetry to retire the old one. Silent meaning changes are worse than an explicit break.
# Why It Matters
Tool clients update independently and a breaking schema can halt automated work.
# Common Mistakes
- **Making an old field required:** Existing clients fail immediately.
- **Changing a field's meaning:** Silent incorrect actions are worse than an error.
# Follow-up Questions
- **When add a tool?** (Answer: When compatibility cannot be preserved.)
- **How is retirement safe?** (Answer: Observe remaining version usage.)
