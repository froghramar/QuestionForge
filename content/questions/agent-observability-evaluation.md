---
id: question.agent-observability-evaluation
title: "Agent: Debug a Bad Outcome"
slug: agent-observability-evaluation
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
An agent returns the wrong answer after several tool calls. Design traces and evaluation so an engineer can identify whether planning, retrieval, tool selection, arguments, or tool output caused the failure.
## Key Concepts
- **Trace:** Record model turns, tool calls, tool results, state transitions, and timings.
- **Privacy:** Redact secrets and apply access controls to traces.
- **Labels:** Classify failure stages to guide fixes and regression tests.
- **Evaluation:** Replay representative tasks and score end-to-end outcomes.
## Question Variations
- "What should an agent trace contain?"
- "How would you turn an incident into an evaluation case?"
