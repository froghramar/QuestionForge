---
id: variant.koa-proxy-configuration.koa
question: question.koa-proxy-configuration
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

When Koa runs behind a TLS-terminating proxy, the direct connection can be HTTP even though the client used HTTPS. Enabling proxy support lets Koa derive values such as `ctx.ip`, `ctx.protocol`, and `ctx.secure` from forwarding headers. Those headers are untrusted unless the controlled edge proxy replaces client-supplied values. Configure the known proxy topology rather than enabling broad trust merely to make secure cookies work.

Koa can use a dedicated proxy IP header or limit the number of trusted IP entries with `maxIpsCount`. These settings should match the actual deployed path and be validated with integration tests. Incorrect configuration can make client-IP limits, audit records, or secure redirect logic accept spoofed data.

# Why It Matters

Proxy trust changes the application’s security boundary and affects client identity derived from HTTP headers.

# Code Example

```typescript
import Koa, { Context } from 'koa';

const app = new Koa({ proxy: true, proxyIpHeader: 'X-Real-IP', maxIpsCount: 1 });
app.use((ctx: Context) => { ctx.body = { ip: ctx.ip, secure: ctx.secure }; });
app.listen(3000);
```

# Common Mistakes

- **Trusting forwarded headers from direct clients:** Attackers can spoof their apparent IP or scheme.
- **Ignoring a multi-proxy path:** Koa may report the wrong client address.

# Follow-up Questions

- **Why does proxy setup affect cookies?** (Answer: It affects whether Koa recognizes an HTTPS request.)
- **Who should sanitize forwarding headers?** (Answer: The trusted edge proxy.)
