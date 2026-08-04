---
id: variant.owasp-broken-access-control.system-design
question: question.owasp-broken-access-control
technology: tech.system-design
---
# Expected Answer (OWASP Top 10:2025)

Broken access control occurs when an application does not consistently enforce what an authenticated identity may do. Authentication answers who the caller is; authorization evaluates whether that caller may perform this action on this specific resource in the current context. Every sensitive endpoint must make that decision server-side. Hiding UI controls, trusting a client-provided role, or checking only that a user is logged in does not prevent direct API requests.

For object-level access, load or query the object through an ownership or tenant constraint and return a non-success response if no permitted object exists. For function-level access, protect administrative or elevated actions with a policy check. Start from deny by default, centralize policies where practical, avoid ID enumeration disclosures, and test both horizontal escalation (one user accessing another's object) and vertical escalation (a normal user invoking an admin action).

# Why It Matters

Access-control failures expose other tenants' data, enable unauthorized financial or administrative actions, and often bypass otherwise sound authentication. They are a leading class of critical application vulnerability.

# Example Code

```typescript
interface Principal {
  tenantId: string;
  permissions: ReadonlySet<string>;
}

export async function deleteInvoice(principal: Principal, invoiceId: string): Promise<void> {
  if (!principal.permissions.has('invoice:delete')) throw new Error('Forbidden');
  const invoice = await findInvoiceInTenant(invoiceId, principal.tenantId);
  if (!invoice) throw new Error('Not found');
  await removeInvoice(invoice.id);
}
```

# Common Mistakes

- **Filtering only in the frontend:** Clients are attacker-controlled; a direct request bypasses the frontend entirely.
- **Looking up by ID before applying the tenant policy:** The code can leak whether another tenant's object exists and risks accidental authorization omission later.
- **Using a role check as the only object authorization:** An editor may be permitted generally but not for every project, tenant, or ownership relationship.

# Follow-up Questions

- **What is horizontal privilege escalation?** (Answer: Accessing a peer user's or tenant's resource without permission.)
- **What is BOLA?** (Answer: Broken Object Level Authorization, an API-focused name for failing to authorize access to a specific object.)

# References

- [OWASP Top 10:2025 — Broken Access Control](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/)
