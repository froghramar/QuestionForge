---
id: concept.angular-view-transitions
title: View Transitions API
slug: angular-view-transitions
topic: topic.angular-advanced
description: Native browser transitions between route changes.
---
# View Transitions API
Angular provides native support for the browser's **View Transitions API**. This allows for smooth, app-like transitions between different routes without requiring complex CSS animation libraries.

Key Features:
- **`withViewTransitions()`:** An easy-to-enable router feature that wraps route changes in a view transition.
- **Cross-document Transitions:** Synchronizing animations between the outgoing and incoming views.
- **Automatic Handling:** Angular manages the timing of the transition to ensure the new view is fully rendered before the animation completes.
- **CSS-based Customization:** Transitions are customized using standard CSS pseudo-elements like `::view-transition-old` and `::view-transition-new`.
