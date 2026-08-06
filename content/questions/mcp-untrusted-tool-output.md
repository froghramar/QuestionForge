---
id: question.mcp-untrusted-tool-output
title: "MCP: Untrusted Tool Output"
slug: mcp-untrusted-tool-output
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
This evaluates whether a candidate understands indirect prompt injection and can enforce trust boundaries around tool results. Interviewers look for structured validation, provenance, independent policy checks, and limits on chained actions.
## Key Concepts
- **Data boundary:** Tool results are content, never instructions with authority.
- **Validation:** Parse structured outputs and validate schemas and provenance.
- **Policy enforcement:** Tool calls are checked independently of model reasoning.
- **Containment:** Limit accessible tools, data, and chained actions.
## Question Variations
- "How does indirect prompt injection reach an agent?"
- "Why is output schema validation useful?"
- "A search tool returns instructions to disclose prompts and call a payment tool. How do you contain the attack?"
