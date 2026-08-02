---
id: concept.angular-directive-composition
title: Directive Composition API
slug: angular-directive-composition
topic: topic.angular-advanced
description: Reusing logic by composing directives within components.
---
# Directive Composition API
Introduced in Angular 15, the Directive Composition API allows you to apply directives to a component's host element from within the component's TypeScript class.

Benefits:
- **Logic Reuse:** Instead of duplicating logic or using inheritance, you can "compose" existing directives into a component.
- **Clean Templates:** No need to manually add multiple directives to every instance of a component in HTML.
- **Encapsulation:** The consumer of the component doesn't need to know which internal directives are providing its functionality.
- **Host Binding/Listener Sharing:** Directives applied via composition have their host bindings and listeners automatically applied to the component's host element.

