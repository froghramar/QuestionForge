---
id: concept.cache-warming
title: Cache Warming
slug: cache-warming
topic: topic.distributed-systems
description: Pre-populating high-value cache entries before demand causes misses.
---
# Cache Warming

Cache warming pre-populates or refreshes selected entries before they are requested. It can reduce cold-start latency but must be selective to avoid wasting origin capacity and cache memory.
