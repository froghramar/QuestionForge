---
id: variant.cache-warming-prefetch.system-design
question: question.cache-warming-prefetch
technology: tech.system-design
---
# Expected Answer (Distributed Caching)

Warm a cache selectively using evidence: the highest-traffic keys, the next requests in a predictable workflow, or data needed by a known upcoming event. Run warming with bounded concurrency and a strict origin-load and memory budget. After a deployment or cluster resize, it can smooth cold-start latency, but warming every key wastes database capacity and can evict the genuinely hot working set.

Prefetch only when the probability and value of a future read justify the extra work. Measure whether warmed or prefetched entries are actually used before expiration. Lazy loading remains preferable for long-tail or unpredictable data because it keeps cache memory and source load proportional to real demand.

# Why It Matters

Unbounded warming can cause the same origin overload it was meant to prevent. A measured policy improves tail latency for important reads without turning startup into a cache-fill storm.

# Example Code

```typescript
export async function warmPopularProducts(ids: string[]): Promise<void> {
  for (const batch of chunk(ids, 25)) {
    await Promise.all(batch.map(async (id) => {
      const product = await repository.findProduct(id);
      await cache.set(`product:${id}`, product, { ttlSeconds: 600 });
    }));
  }
}
```

# Common Mistakes

- **Warming the whole database:** It consumes origin and cache capacity for entries users may never request.
- **Warming without a concurrency limit:** A restart can turn cache population into a database denial of service.

# Follow-up Questions

- **How do you evaluate a warming policy?** (Answer: Measure later cache hits for warmed keys, user latency, origin load, and eviction impact.)
- **When is lazy loading better?** (Answer: For a large or unpredictable keyspace where preloading has little expected reuse.)
