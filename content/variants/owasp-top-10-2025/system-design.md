---
id: variant.owasp-top-10-2025.system-design
question: question.owasp-top-10-2025
technology: tech.system-design
---
# Expected Answer (OWASP Top 10:2025)

The OWASP Top 10:2025 is an awareness document for the most critical web application security risks. Its categories are Broken Access Control, Security Misconfiguration, Software Supply Chain Failures, Cryptographic Failures, Injection, Insecure Design, Authentication Failures, Software or Data Integrity Failures, Security Logging and Alerting Failures, and Mishandling of Exceptional Conditions. A strong answer uses the list to discuss concrete controls rather than reciting labels.

For example, enforce authorization on the server for every object and action, use parameterized queries and safe APIs for injection, establish secure configuration baselines, and manage dependency provenance and patching. Design review and threat modeling address risks before code exists; automated tests, dependency scanning, logging, monitoring, and incident response catch and reduce risk during delivery and operation. The Top 10 is not a complete checklist: an application's threats depend on its assets, architecture, and attackers.

# Why It Matters

The Top 10 gives teams shared language for prioritizing common high-severity failures. Treating it as a checkbox exercise, however, misses business-specific abuse cases and can leave critical authorization and design flaws unexamined.

# Example Code

```typescript
import type { Request, Response } from 'express';

interface Project {
  id: string;
  ownerId: string;
}

export async function getProject(request: Request, response: Response): Promise<void> {
  const project = await findProject(request.params.projectId) as Project | undefined;
  if (!project || project.ownerId !== request.user.id) {
    response.sendStatus(404);
    return;
  }
  response.json(project);
}
```

# Common Mistakes

- **Checking authorization only in the UI:** An attacker can call the API directly; every sensitive server endpoint needs an authorization decision.
- **Equating encryption with overall security:** Cryptography cannot compensate for broken access control, injection, unsafe design, or leaked secrets.
- **Treating a passing scanner as proof of safety:** Tools are valuable signals but do not replace threat modeling, code review, and manual authorization testing.

# Follow-up Questions

- **What is the difference between authentication and authorization?** (Answer: Authentication establishes an identity; authorization determines what that identity may do.)
- **Why return 404 for an unauthorized object in some APIs?** (Answer: It can avoid disclosing whether a resource exists, provided the product's semantics support that choice.)

# References

- [OWASP Top 10:2025](https://owasp.org/Top10/)
