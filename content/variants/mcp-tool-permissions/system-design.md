---
id: variant.mcp-tool-permissions.system-design
question: question.mcp-tool-permissions
technology: tech.system-design
---
# Expected Answer
I would design MCP tools as narrow capabilities, not a general API wrapper. The server authenticates the user, authorizes every argument, and uses scoped credentials; the model only proposes a call. Reads are filtered to the caller's scope, while refunds require explicit confirmation, amount limits, and an audit record. Tool descriptions aid selection but never grant permission.
# Why It Matters
Prompt compromise must not become account compromise.
# Common Mistakes
- **Trusting model instructions:** They are not access control.
- **Using broad service tokens:** One tool call gains excessive power.
# Follow-up Questions
- **What needs confirmation?** (Answer: Consequential external actions.)
- **Where is policy enforced?** (Answer: At the tool server.)
