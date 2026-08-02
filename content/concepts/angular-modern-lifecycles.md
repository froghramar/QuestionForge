---
id: concept.angular-modern-lifecycles
title: Modern Lifecycle Hooks (afterRender)
slug: angular-modern-lifecycles
topic: topic.angular-advanced
description: Synchronizing with the DOM using afterRender and afterNextRender.
---
# Modern Lifecycle Hooks
Angular 17 introduced new lifecycle hooks designed specifically for working safely with the browser's DOM, especially in SSR and hydration contexts.

Key Hooks:
- **`afterRender`:** Executes after every change detection cycle that resulted in a DOM update. Useful for logic that needs to synchronize with the final layout (e.g., resizing observers).
- **`afterNextRender`:** Executes only once, after the next change detection cycle. Ideal for one-time initialization that requires DOM access (e.g., initializing a third-party library like D3 or Google Maps).

Why They Differ from `ngAfterViewInit`:
- **Client-only:** These hooks *never* run on the server, making them safe for `window` or `document` access without environment checks.
- **Phase-aware:** They run after the browser has completed the render/layout phase, ensuring you get accurate measurements.

