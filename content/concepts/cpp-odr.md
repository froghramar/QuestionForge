---
id: concept.cpp-odr
title: C++ Translation Units and ODR
slug: cpp-translation-units-and-odr
topic: topic.cpp-fundamentals
description: Separate compilation, linkage, and the One Definition Rule.
---
# C++ Translation Units and ODR

C++ source files are compiled separately into translation units and later linked. The One Definition Rule constrains which declarations and definitions may appear across those units and prevents inconsistent definitions of the same entity.
