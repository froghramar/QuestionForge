---
id: variant.vector-multitenant-isolation.system-design
question: question.vector-multitenant-isolation
technology: tech.system-design
---
# Expected Answer
Similarity must never decide access. I derive tenant and permission filters from the authenticated identity, apply them before ranking, and validate the returned documents again in the application. Ingestion owns trusted access metadata; callers never supply it. Separate indexes are justified when legal isolation or blast radius requires it. I would test adversarial cross-tenant queries and audit filter decisions without logging document contents.
# Why It Matters
Similarity is not authorization; one leaked chunk can expose another customer's data.
# Common Mistakes
- **Using a prompt to enforce tenancy:** The model cannot be the security boundary.
- **Accepting caller-supplied tenant IDs:** Attackers can request another namespace.
# Follow-up Questions
- **When use separate indexes?** (Answer: When isolation requirements outweigh operational cost.)
- **Where is filtering enforced?** (Answer: At retrieval and application authorization layers.)
