---
id: concept.cache-stampede
title: Cache Stampede Prevention
slug: cache-stampede
topic: topic.distributed-systems
description: Protecting origins when many requests miss or refresh the same cache key together.
---
# Cache Stampede Prevention

A cache stampede occurs when concurrent requests regenerate an absent or expired hot key at the same time. Request coalescing, locking, stale serving, and expiry jitter reduce origin load.
