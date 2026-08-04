---
id: concept.cpp-smart-pointers
title: C++ Smart Pointers
slug: cpp-smart-pointers
topic: topic.cpp-fundamentals
description: RAII-managed heap ownership with unique_ptr, shared_ptr, and weak_ptr.
---
# C++ Smart Pointers

Smart pointers express ownership of heap-allocated objects. `std::unique_ptr` provides exclusive ownership, `std::shared_ptr` provides reference-counted ownership, and `std::weak_ptr` observes a shared object without extending its lifetime.
