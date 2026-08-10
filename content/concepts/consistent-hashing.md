---
id: concept.consistent-hashing
title: Consistent Hashing
slug: consistent-hashing
topic: topic.distributed-systems
description: Distributing keys across a changing set of cache nodes while minimizing remapping.
---
# Consistent Hashing

Consistent hashing maps keys to nodes so adding or removing a node remaps only part of the keyspace. Virtual nodes improve distribution when node capacity or key distribution is uneven.

```mermaid
graph LR
    subgraph HashRing [Hash Ring 0 to 2^32-1]
        NodeA[Node A] --- Key1(Key 1)
        Key1 --- NodeB[Node B]
        NodeB --- Key2(Key 2)
        Key2 --- NodeC[Node C]
        NodeC --- Key3(Key 3)
        Key3 --- NodeA
    end
```
