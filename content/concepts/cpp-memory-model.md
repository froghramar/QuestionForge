---
id: concept.cpp-memory-model
title: C++ Memory Model and Data Races
slug: cpp-memory-model-and-data-races
topic: topic.cpp-fundamentals
description: Thread synchronization, visibility, atomics, and undefined behavior from data races.
---
# C++ Memory Model and Data Races

The C++ memory model defines how threads observe reads and writes. A data race on non-atomic memory is undefined behavior; mutexes and atomics create the synchronization needed to safely communicate between threads.
