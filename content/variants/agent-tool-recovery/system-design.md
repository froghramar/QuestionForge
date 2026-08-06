---
id: variant.agent-tool-recovery.system-design
question: question.agent-tool-recovery
technology: tech.system-design
---
# Expected Answer
I persist the workflow step, normalized inputs, idempotency key, and external operation ID before calling the booking API. A timeout means the outcome is unknown, so the agent queries status with the stable key before retrying. Retries are bounded, unresolved ambiguity becomes a visible pending state, and recovery survives process restart. That prevents a polite but incorrect claim of success or a duplicate reservation.
# Why It Matters
External side effects can succeed even when the agent never receives a reply.
# Common Mistakes
- **Retrying with a new key:** It can create duplicate bookings.
- **Keeping state only in context:** Restart recovery becomes impossible.
# Follow-up Questions
- **What survives restart?** (Answer: Step state and external operation identities.)
- **What does timeout mean?** (Answer: Outcome is unknown, not necessarily failed.)
