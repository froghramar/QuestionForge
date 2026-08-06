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
This tests whether a candidate can make multi-step agent failures observable and reproducible. Interviewers assess causal tracing, privacy controls, failure taxonomy, and converting incidents into regression evaluations.
## Key Concepts
- **Trace:** Record model turns, tool calls, tool results, state transitions, and timings.
- **Privacy:** Redact secrets and apply access controls to traces.
- **Labels:** Classify failure stages to guide fixes and regression tests.
- **Evaluation:** Replay representative tasks and score end-to-end outcomes.
## Question Variations
- "What should an agent trace contain?"
- "How would you turn an incident into an evaluation case?"
- "An agent gave a wrong answer after several tool calls. How would you isolate the failed stage and prevent recurrence?"
