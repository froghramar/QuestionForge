---
id: concept.cpp-exception-safety
title: C++ Exception Safety
slug: cpp-exception-safety
topic: topic.cpp-fundamentals
description: Resource safety and state guarantees when operations throw exceptions.
---
# C++ Exception Safety

Exception-safe C++ code uses RAII so resources are released during stack unwinding and defines what state remains after an operation throws. Common guarantees are no-throw, strong, and basic.
