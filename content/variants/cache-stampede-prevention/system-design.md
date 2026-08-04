---
id: variant.cache-stampede-prevention.system-design
question: question.cache-stampede-prevention
technology: tech.system-design
---
# Expected Answer (Distributed Caching)

A stampede occurs when a hot key expires or disappears and many concurrent requests all regenerate it. Use single-flight request coalescing within one process so only one request loads the origin. Across many instances, use a distributed lock with a short lease, or use stale-while-revalidate: one request refreshes while other callers receive a recently expired value. Add randomized TTL jitter so related keys do not expire in the same instant, and impose timeouts and load shedding so a cache outage does not exhaust the database.

Coordination must fail safely. A lock needs an expiry to avoid permanent blocking if its holder crashes, but its holder should renew only when ownership is clear. Do not make every caller wait indefinitely for the refresh: where product semantics allow it, bounded staleness is often safer than turning an availability problem into an origin overload.

# Why It Matters

Stampedes turn a normal expiration into a cascading failure. Protecting the origin keeps the system available during cache churn, deployments, or partial cache outages.

# Example Code

```typescript
const inflight = new Map<string, Promise<string>>();

export function singleFlight(key: string, load: () => Promise<string>): Promise<string> {
  const existing = inflight.get(key);
  if (existing) return existing;
  const pending = load().finally(() => inflight.delete(key));
  inflight.set(key, pending);
  return pending;
}
```

# Common Mistakes

- **Using a distributed lock without an expiry:** A crashed lock holder can block refreshes forever.
- **Refreshing every expired key synchronously:** A traffic burst can make callers wait and overload the origin simultaneously.

# Follow-up Questions

- **What is stale-while-revalidate?** (Answer: Serve a bounded stale value while one request refreshes it asynchronously.)
- **Why add TTL jitter?** (Answer: It spreads refresh work over time instead of synchronizing expiration across many keys.)

# References

- [Redis caching patterns](https://redis.io/learn/howtos/solutions/caching)
