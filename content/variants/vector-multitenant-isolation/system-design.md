---
id: variant.vector-multitenant-isolation.system-design
question: question.vector-multitenant-isolation
technology: tech.system-design
---
# Expected Answer
Derive tenant and document permissions from the authenticated caller, then apply them as a mandatory retrieval filter before results reach the model. Store trusted authorization metadata with each vector, validate it at ingestion, and check it again in application code. Use separate indexes when regulatory or blast-radius requirements demand stronger physical isolation. Include cross-tenant adversarial queries in tests and log denied-filter behavior without logging content.
# Why It Matters
Similarity is not authorization; one leaked chunk can expose another customer's data.
# Common Mistakes
- **Using a prompt to enforce tenancy:** The model cannot be the security boundary.
- **Accepting caller-supplied tenant IDs:** Attackers can request another namespace.
# Follow-up Questions
- **When use separate indexes?** (Answer: When isolation requirements outweigh operational cost.)
- **Where is filtering enforced?** (Answer: At retrieval and application authorization layers.)
