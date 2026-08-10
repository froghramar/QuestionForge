---
id: concept.go-goroutines-channels
title: Go Goroutines and Channels
slug: go-goroutines-and-channels
topic: topic.go-fundamentals
description: Lightweight concurrent functions and typed communication channels.
---
# Go Goroutines and Channels

Goroutines are lightweight concurrent functions managed by the Go runtime. Channels let goroutines synchronize and exchange typed values, while cancellation and ownership prevent leaks and deadlocks.

```mermaid
graph LR
    G1((Goroutine A)) -- Send data --> CH{Channel}
    CH -- Receive data --> G2((Goroutine B))
    
    subgraph Scheduling
        M[OS Thread] --- P[Processor]
        P --- G1
        P --- G3((Goroutine C))
    end
```
