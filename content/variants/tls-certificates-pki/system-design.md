---
id: variant.tls-certificates-pki.system-design
question: question.tls-certificates-pki
technology: tech.system-design
---
# Expected Answer (TLS 1.3 / PKI)

When connecting to HTTPS, a client receives a leaf certificate and validates that it is currently valid, that its Subject Alternative Name matches the requested hostname, and that its signature chain leads through trusted intermediate certificates to a configured trust anchor. The server proves possession of the leaf certificate's corresponding private key during the TLS handshake. A certificate for one hostname is not valid for another unless that other name appears in its SAN extension.

Root CAs are long-lived trust anchors distributed in operating-system or browser trust stores. Intermediate CAs are signed by roots and issue leaf certificates, allowing roots to remain protected and offline more often. The private key is the critical secret: compromise requires certificate replacement and key rotation. Automate issuance, renewal, deployment, and monitoring through ACME or managed certificate services; expired certificates cause availability incidents, while disabling verification turns certificate errors into man-in-the-middle exposure.

# Why It Matters

Certificate validation is what prevents an attacker with network access from presenting an arbitrary encrypted endpoint as your API. Reliable renewal and correct chain deployment are as important operationally as the protocol itself.

# Example Code

```typescript
import { request } from 'node:https';

export function fetchApi(): void {
  const call = request('https://api.example/health', {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
    servername: 'api.example',
  }, (response) => response.resume());

  call.on('error', (error: Error) => console.error(error.message));
  call.end();
}
```

# Common Mistakes

- **Disabling `rejectUnauthorized` in production:** It accepts untrusted certificates and removes the server-authentication property of TLS.
- **Checking the common name but ignoring SAN:** Modern hostname validation uses Subject Alternative Names.
- **Treating certificate renewal as a manual calendar task:** Human processes regularly miss expiry; automate and alert before renewal failures affect users.

# Follow-up Questions

- **Why use intermediate CAs?** (Answer: They let a protected root delegate issuance while limiting exposure of the root signing key.)
- **What does hostname validation prove?** (Answer: That the certificate is authorized for the specific host the client intended to contact.)

# References

- [RFC 8446: TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446)
