---
id: question.js-prototypes
title: Prototype Chain & new
slug: js-prototypes-internals
difficulty: Hard
topic: topic.type-systems
concepts:
  - concept.closures
estimated_time: 20
updated: 2026-08-01
---

## Why This Is Asked

This separates developers who have surface-level ES6 class knowledge from those who understand JavaScript's true inheritance model. Interviewers want to see if you can explain what `new` actually does under the hood and how the prototype chain resolves property lookups.

## Key Concepts

- JavaScript uses prototypal inheritance, not classical inheritance — objects inherit directly from other objects
- Every object has a hidden `[[Prototype]]` link; property lookups walk this chain until `null`
- `new` does four things: creates an empty object, links its prototype, executes the constructor with `this` bound, returns the object (unless the constructor returns a different object)
- `__proto__` is the object's prototype link; `.prototype` is a property on functions used when they act as constructors
- `class` syntax is syntactic sugar — it does not change the underlying prototype mechanism

## Question Variations

- "What happens internally when you use the `new` keyword in JavaScript?"
- "Explain the difference between `__proto__` and `prototype`."
- "How does the prototype chain work when looking up a property on an object?"
- "Can you implement a simple inheritance pattern using prototypes without the `class` keyword?"
