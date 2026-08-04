---
id: variant.consistent-hashing-cache-clusters.system-design
question: question.consistent-hashing-cache-clusters
technology: tech.system-design
---
# Expected Answer (Distributed Caching)

Modulo hashing maps a key by computing its hash modulo the number of nodes. Changing the node count changes the divisor, so most keys remap and produce a miss storm. Consistent hashing places nodes and keys on a shared hash ring and maps each key to the next node. Adding or removing one node then affects only the portion of the ring it owns.

Use virtual nodes so each physical cache node appears at multiple ring positions. This improves balance and lets capacity-weighted nodes own a proportional share. Membership changes still create misses for affected keys, so combine the topology with origin protection, gradual rebalancing, and health-aware routing. Replication can reduce miss impact but increases memory use and invalidation complexity.

# Why It Matters

Without stable key distribution, routine scaling and node failures can dump the whole working set onto the origin. Consistent hashing localizes this churn to a manageable fraction.

# Example Code

```typescript
function cacheNode(key: string, ring: ReadonlyArray<{ point: number; node: string }>): string {
  const point = hash32(key);
  return (ring.find((entry) => entry.point >= point) ?? ring[0]).node;
}
```

# Common Mistakes

- **Assuming consistent hashing eliminates misses during scaling:** It only limits remapping; affected keys still need to be repopulated.
- **Using one position per physical node:** Uneven hash distribution can overload a node; virtual nodes improve balance.

# Follow-up Questions

- **Why are virtual nodes useful?** (Answer: They distribute each physical node across the ring, improving balance and supporting weighted capacity.)
- **What happens when a selected node is unhealthy?** (Answer: Route to a configured fallback or treat it as a miss while avoiding retry storms.)
