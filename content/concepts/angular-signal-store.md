---
id: concept.angular-signal-store
title: NgRx SignalStore
slug: angular-signal-store
topic: topic.angular-advanced
description: Functional and type-safe state management built on Angular Signals.
---
# NgRx SignalStore
The SignalStore is a functional, signal-based state management solution provided by NgRx. It is designed to be lightweight, highly composable, and fully integrated with Angular's fine-grained reactivity.

Key Features:
- **Functional API:** Define state, computed properties, and methods (updaters/effects) using a composable functional approach.
- **Signal-based:** The entire state is exposed as signals, enabling efficient UI updates.
- **Extensions:** Easily add functionality like `withEntities` (for collection management) or `withHooks` (for lifecycle management).
- **Type Safety:** Deep integration with TypeScript for excellent developer experience and refactoring safety.
- **Tree-shakeable:** Only include the features you actually use.
