---
id: variant.mcp-tool-permissions.system-design
question: question.mcp-tool-permissions
technology: tech.system-design
---
# Expected Answer
Tools expose narrow operations and use user-scoped credentials. The MCP server independently authenticates the caller, authorizes every argument, and records the policy decision. Reads are scoped; refunds require explicit confirmation and limits. Tool descriptions help the model choose, but never grant authority.
# Why It Matters
Prompt compromise must not become account compromise.
# Common Mistakes
- **Trusting model instructions:** They are not access control.
- **Using broad service tokens:** One tool call gains excessive power.
# Follow-up Questions
- **What needs confirmation?** (Answer: Consequential external actions.)
- **Where is policy enforced?** (Answer: At the tool server.)
