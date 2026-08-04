---
id: concept.cpp-value-categories
title: C++ Value Categories and Forwarding
slug: cpp-value-categories-and-forwarding
topic: topic.cpp-fundamentals
description: Lvalues, rvalues, references, and preserving argument value categories.
---
# C++ Value Categories and Forwarding

Value categories describe expression identity and lifetime. Forwarding references and `std::forward` let generic wrappers preserve whether an argument was an lvalue or rvalue when passing it onward.
