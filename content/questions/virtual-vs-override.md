---
id: question.virtual-vs-override
title: virtual vs override
slug: virtual-vs-override
difficulty: Easy
topic: topic.type-systems
estimated_time: 8
updated: 2026-08-02
---

## Why This Is Asked

This is a fundamental check for understanding Polymorphism in C# and similar languages. Interviewers want to see if you know how to enable and implement method redefinition in child classes.

## Key Concepts

- **virtual**: A keyword used in the base class to allow a method to be redefined in a derived class.
- **override**: A keyword used in the derived class to provide a new implementation of a virtual method.
- **Polymorphism**: The ability for a base class reference to call the overridden method of a derived object at runtime.
- **new**: The "new" keyword (method shadowing) is often contrasted with `override`.

## Question Variations

- "What is the difference between `override` and `new` (shadowing) when redefining a method in a derived class?"
- "Can you override a method that is not marked as `virtual` or `abstract`?"
- "What happens at runtime when you call a virtual method through a base class reference that points to a derived class instance?"
- "Can you use the `override` keyword on a static method?"
