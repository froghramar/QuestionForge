---
id: question.agent-tool-recovery
title: "Agent: Recover from Tool Failure"
slug: agent-tool-recovery
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
An agent must book travel, but one tool times out after possibly making a reservation. Design state, idempotency, retry, and user communication so it neither silently abandons nor duplicates work.
## Key Concepts
- **Durable state:** Persist workflow step, inputs, and external operation IDs.
- **Idempotency:** Use stable operation keys and query status before retrying.
- **Bounded recovery:** Limit retries and escalate unresolved ambiguity.
- **User visibility:** Report pending or failed state instead of fabricating completion.
## Question Variations
- "How does an agent distinguish a timeout from a failed action?"
- "What state must survive an agent restart?"
