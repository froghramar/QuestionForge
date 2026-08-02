---
id: concept.angular-signal-apis
title: Signal-based Component APIs
slug: angular-signal-apis
topic: topic.angular-fundamentals
description: The modern input(), output(), and model() functions.
---
# Signal-based Component APIs
Modern Angular (v17.2+) shifted component communication from decorators (`@Input`, `@Output`) to signal-based functions. These functions provide better type safety, cleaner code, and integrate natively with the framework's fine-grained reactivity.

Key Functions:
- **`input()` / `input.required()`:** Replaces `@Input`. The property is a `Signal`, allowing for automatic dependency tracking in `computed()` and `effect()`.
- **`output()`:** Replaces `@Output`. Provides a cleaner, type-safe way to emit events.
- **`model()`:** A special primitive for two-way data binding. It exposes a signal that can be both read and updated, simplifying parent-child synchronization.
- **`viewChild()` / `contentChild()`:** Signal-based versions of the old query decorators, returning signals that update automatically as the view changes.
