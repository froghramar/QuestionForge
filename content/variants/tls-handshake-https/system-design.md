---
id: variant.tls-handshake-https.system-design
question: question.tls-handshake-https
technology: tech.system-design
---
# Expected Answer (TLS 1.3)

HTTPS is HTTP over TLS. TLS establishes a secure channel: the client validates the server certificate chain and hostname, the peers negotiate parameters and perform ephemeral key agreement, and they derive traffic keys. After the handshake, TLS 1.3 uses authenticated encryption for records, providing confidentiality and integrity. The server is normally authenticated; client-certificate authentication is optional and used only in some systems.

The certificate proves control through a trusted public-key infrastructure; it does not authorize a user or validate application input. Configure current protocol versions and cipher suites through a maintained TLS library or platform, renew certificates automatically, redirect HTTP to HTTPS, and set HSTS only after HTTPS is working everywhere. At a load balancer, TLS termination decrypts traffic there; the connection from the proxy to the application must still be protected according to the network threat model.

TLS 1.3 provides forward secrecy with ephemeral key exchange in normal handshakes. Its 0-RTT early data can be replayed, so applications must use it only for replay-safe operations and must never place a payment, mutation, or other non-idempotent action in early data.

# Why It Matters

TLS misconfiguration exposes credentials and session data to interception or enables downgraded protection. Misunderstanding termination or 0-RTT can leave internal hops unprotected or allow replayed side effects.

# Example Code

```typescript
import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

const server = createServer({
  cert: readFileSync('/run/secrets/tls.crt'),
  key: readFileSync('/run/secrets/tls.key'),
  minVersion: 'TLSv1.2',
}, (_request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('HTTPS is enabled');
});

server.listen(443);
```

# Common Mistakes

- **Disabling certificate verification to fix a connection error:** This removes server authentication and enables man-in-the-middle attacks; fix trust configuration instead.
- **Assuming HTTPS authorizes the caller:** TLS protects the transport but does not decide whether a user may read or modify a resource.
- **Using 0-RTT for state-changing requests:** Early data can be replayed, potentially duplicating a purchase, transfer, or deletion.

# Follow-up Questions

- **What does certificate hostname validation prevent?** (Answer: It prevents a trusted certificate for one host from impersonating a different requested host.)
- **What is TLS termination?** (Answer: A proxy or load balancer completes TLS, then forwards the request to an upstream service under a separately configured security boundary.)

# References

- [RFC 8446: TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446)
