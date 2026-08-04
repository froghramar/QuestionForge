---
id: variant.cache-observability-capacity.system-design
question: question.cache-observability-capacity
technology: tech.system-design
---
# Expected Answer (Distributed Caching)

Start with the request path: measure cache hit and miss counts, hit and miss latency, cache errors, and the database or upstream work avoided. Then measure pressure: memory use, evictions, item-size distribution, connection saturation, hot keys, and tail latency. A high hit rate can be misleading if the cached keys are cheap, if expensive keys always miss, or if stale entries return incorrect results.

Capacity planning estimates the active working set rather than the entire database. Sample key sizes, account for serialization and protocol overhead, choose a target fraction of the working set, and leave headroom for bursts and fragmentation. Validate the estimate under realistic access distributions. Alert on origin saturation and user-facing SLOs as well as cache internals, because the cache exists to protect the application outcome.

# Why It Matters

Operating from hit rate alone hides eviction pressure, slow cache calls, and workloads with little actual saved cost. A full metric set lets teams right-size caches and identify when caching is not the right optimization.

# Example Code

```typescript
export function cacheHitRatio(hits: number, misses: number): number {
  const total = hits + misses;
  return total === 0 ? 0 : hits / total;
}
```

# Common Mistakes

- **Sizing from total database size:** Only the active working set needs to be cached, but it needs overhead and burst headroom.
- **Alerting only on cache availability:** A slow, eviction-heavy cache can harm users even while every node is technically up.

# Follow-up Questions

- **Which metric shows memory pressure directly?** (Answer: Eviction rate combined with memory utilization and slab or item-size distribution.)
- **Why track origin load with cache metrics?** (Answer: It reveals whether misses are actually causing user-facing or database impact.)
