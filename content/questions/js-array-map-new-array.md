---
id: question.js-array-map-new-array
title: Array.map and Immutability
slug: js-array-map-new-array
difficulty: Easy
topic: topic.javascript-fundamentals
concepts:
  - concept.immutability
estimated_time: 5
updated: 2026-08-02
---

## Why This Is Asked

This is a fundamental question to check if a developer understands the difference between **mutating** and **non-mutating** array methods. It is especially important in frameworks like React where immutability is required for efficient change detection.

## Key Concepts

- `Array.prototype.map()` creates a **new array** with the results of calling a provided function on every element.
- It does **not** mutate the original array.
- The new array has the same length as the original array.
- If the elements are objects, the new array will contain references to the same objects (shallow copy) unless you explicitly clone them in the callback.

## Question Variations

- "Does `Array.map()` modify the original array? Why is this important?"
- "What is the difference between `Array.map()` and `Array.forEach()`?"
- "If you have an array of objects and use `.map()` to change a property on an object, does the original array change? (Shallow vs Deep copy)"
- "How do you filter and transform an array at the same time using `.map()` and other methods?"
