---
id: question.prompt-injection-defense
title: Prompt Injection in Support AI
slug: prompt-injection-defense
difficulty: Hard
topic: topic.ai-engineering
estimated_time: 20
updated: 2026-08-06
---
## Why This Is Asked
A support assistant reads emails and knowledge-base pages before it can call account tools. Design defenses against prompt injection without assuming a system prompt can reliably override hostile content.
## Key Concepts
- **Untrusted context:** Retrieved text is data, not privileged instruction.
- **Capability controls:** Sensitive actions require server-side authorization and confirmation.
- **Data minimization:** Give the model only the context and tools required.
- **Testing:** Red-team direct and indirect injections continuously.
## Question Variations
- "Why can't prompt wording alone prevent injection?"
- "How would you test an agent against retrieved malicious text?"
