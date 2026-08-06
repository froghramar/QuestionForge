---
id: question.mcp-tool-contract-versioning
title: "MCP: Evolving a Tool Contract"
slug: mcp-tool-contract-versioning
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
An MCP tool's `create_ticket` input must gain a required project field while older clients remain deployed. Explain compatible evolution, validation, rollout, and observability.
## Key Concepts
- **Additive change:** New optional fields and safe defaults preserve older clients.
- **Versioning:** Breaking input changes require a new tool or negotiated version.
- **Schemas:** Validate inputs and outputs at the server boundary.
- **Telemetry:** Measure old contract use before deprecation.
## Question Variations
- "When should a tool name change rather than its schema?"
- "How do you safely make a field required?"
