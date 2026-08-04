---
id: concept.go-synchronization
title: Go Synchronization and Data Races
slug: go-synchronization-and-data-races
topic: topic.go-fundamentals
description: Coordinating shared memory safely with mutexes, atomics, channels, and the race detector.
---
# Go Synchronization and Data Races

A data race occurs when concurrent goroutines access the same memory, at least one access is a write, and the accesses are not synchronized. Go provides mutexes, atomics, channels, and the race detector to make ownership and synchronization explicit.
