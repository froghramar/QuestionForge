---
id: question.mcp-tool-permissions
title: "MCP: Tool Permission Boundaries"
slug: mcp-tool-permissions
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
An assistant can call tools that read customer data and issue refunds. Design MCP tool boundaries, authorization, confirmation, and auditability so a compromised prompt cannot perform an unsafe action.
## Key Concepts
- **Least privilege:** Expose narrow tools with scoped credentials.
- **Authorization:** Enforce identity and policy at the tool server, not in model instructions.
- **Confirmation:** Require user approval for consequential actions.
- **Audit:** Log inputs, actor, policy decision, and result without exposing secrets.
## Question Variations
- "Why is an MCP tool description not an authorization boundary?"
- "Which actions require human confirmation?"
