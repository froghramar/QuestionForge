---
id: variant.agent-tool-recovery.system-design
question: question.agent-tool-recovery
technology: tech.system-design
---
# Expected Answer
Persist workflow state, inputs, operation IDs, and idempotency keys before calling the booking tool. On timeout, query status using the stable key before retrying. Bound retries, surface pending status to the user, and escalate unresolved ambiguity rather than claiming success.
# Why It Matters
External side effects can succeed even when the agent never receives a reply.
# Common Mistakes
- **Retrying with a new key:** It can create duplicate bookings.
- **Keeping state only in context:** Restart recovery becomes impossible.
# Follow-up Questions
- **What survives restart?** (Answer: Step state and external operation identities.)
- **What does timeout mean?** (Answer: Outcome is unknown, not necessarily failed.)
