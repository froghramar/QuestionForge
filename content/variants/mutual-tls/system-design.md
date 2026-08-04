---
id: variant.mutual-tls.system-design
question: question.mutual-tls
technology: tech.system-design
---
# Expected Answer (TLS 1.3)

In ordinary TLS, the client authenticates the server's certificate. Mutual TLS, or mTLS, additionally requires the client to present a certificate that the server validates against a trusted client CA or trust bundle. This gives the server a cryptographic workload identity at the transport boundary and is useful for internal service-to-service communication, B2B integrations, and high-assurance client authentication.

mTLS is not free identity magic. A production design needs secure certificate issuance, short lifetimes, automated rotation, trust-bundle distribution, revocation or rapid replacement procedures, observability, and clear rules for mapping certificate identities to workloads. A service mesh can automate these operations and encrypt east-west traffic, but application authorization remains necessary: a valid certificate says which workload connected, while policy decides what that workload may access.

# Why It Matters

mTLS limits bearer-token replay and strengthens service identity, but manual certificate handling commonly causes outages or trust failures. Treating client certificates as authorization by themselves can over-permit a compromised workload.

# Example Code

```typescript
import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

const server = createServer({
  cert: readFileSync('/run/tls/server.crt'),
  key: readFileSync('/run/tls/server.key'),
  ca: readFileSync('/run/tls/client-ca.crt'),
  requestCert: true,
  rejectUnauthorized: true,
}, (request, response) => {
  const identity = request.socket.getPeerCertificate().subject?.CN;
  response.end(`authenticated workload: ${identity ?? 'unknown'}`);
});

server.listen(8443);
```

# Common Mistakes

- **Setting `requestCert` without `rejectUnauthorized`:** The server requests a certificate but can still accept an untrusted client.
- **Using long-lived manually distributed certificates:** Rotation and revocation become slow and error-prone; automate short-lived credentials.
- **Equating a client certificate with permission to every endpoint:** Map the workload identity to least-privilege application policy.

# Follow-up Questions

- **What does a service mesh add to mTLS?** (Answer: It can automate certificate issuance, rotation, trust distribution, and encrypted service-to-service transport.)
- **Does mTLS replace JWT authorization?** (Answer: Not necessarily; mTLS identifies the calling workload while JWTs or other policies may express user or delegated permissions.)

# References

- [RFC 8446: TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446)
