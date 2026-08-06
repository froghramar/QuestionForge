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
This tests whether a candidate distinguishes an LLM's tool selection from actual authority. Interviewers assess least-privilege tool design, server-side authorization, confirmation for consequential actions, and auditability.
## Key Concepts
- **Least privilege:** Expose narrow tools with scoped credentials.
- **Authorization:** Enforce identity and policy at the tool server, not in model instructions.
- **Confirmation:** Require user approval for consequential actions.
- **Audit:** Log inputs, actor, policy decision, and result without exposing secrets.
## Question Variations
- "Why is an MCP tool description not an authorization boundary?"
- "Which actions require human confirmation?"
- "Design MCP tools for customer-data access and refunds so prompt compromise cannot issue an unsafe refund."
