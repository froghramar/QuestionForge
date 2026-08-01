---
id: concept.concurrency-control
title: Concurrency Control
slug: concurrency-control
topic: topic.database-fundamentals
description: Methods for handling simultaneous access to data.
---
# Concurrency Control
When multiple processes access the same data simultaneously, systems use:
- **Pessimistic Locking:** Prevents conflict by locking data (e.g., `SELECT FOR UPDATE`). Best for high-contention environments.
- **Optimistic Locking:** Assumes no conflict; checks for changes before commit (e.g., via version columns). Best for low-contention environments.
