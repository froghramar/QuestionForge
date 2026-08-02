---
id: concept.angular-change-detection
title: Angular Change Detection
slug: angular-change-detection
topic: topic.angular-fundamentals
description: How Angular detects and propagates state changes to the UI.
---
# Angular Change Detection
Change detection is the process by which Angular synchronizes the state of the application with the user interface.

Key concepts:
- **Zone.js:** The legacy library that monkey-patches browser APIs. Modern Angular (v22+) is moving towards a Zoneless architecture by default.
- **ChangeDetectionStrategy.OnPush:** As of Angular 22, `OnPush` is the default for all new components, leveraging Signals for precise UI updates.
- **Zoneless Angular:** The standard approach in v22, removing the dependency on `Zone.js` for better performance and smaller bundles.
- **Signal-based Reactivity:** The core engine driving change detection in v22, allowing Angular to track exactly what needs to change without traversing the entire component tree.
