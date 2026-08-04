---
id: question.cpp-translation-units-and-odr
title: Translation Units and ODR
slug: cpp-translation-units-and-odr
difficulty: Hard
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-odr
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Separate compilation affects every non-trivial C++ project. This question tests whether you understand declarations versus definitions, why headers require include guards, and how the One Definition Rule prevents fragile build and linkage behavior.

## Key Concepts

- Each source file plus its included headers forms a translation unit.
- Declarations introduce names; definitions provide storage or function bodies.
- The One Definition Rule restricts duplicate definitions across a program.
- `inline`, templates, and class definitions may appear in headers when their definitions are consistent.

## Question Variations

- "What is a translation unit in C++?"
- "What is the difference between a declaration and a definition?"
- "Why do headers need include guards or `#pragma once`?"
- "Why are template definitions usually placed in headers?"
