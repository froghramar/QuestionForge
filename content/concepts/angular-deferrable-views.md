---
id: concept.angular-deferrable-views
title: Deferrable Views (@defer)
slug: angular-deferrable-views
topic: topic.angular-fundamentals
description: Declarative lazy-loading of template sections for performance optimization.
---
# Deferrable Views
Deferrable views, introduced with the `@defer` block, allow developers to declaratively lazy-load parts of a template. This significantly improves initial load time by reducing the amount of JavaScript needed for the first paint.

Key Triggers:
- **on idle:** Load when the browser is idle (default).
- **on viewport:** Load when the content enters the viewport.
- **on interaction:** Load when the user interacts with a placeholder (e.g., click, focus).
- **on hover:** Load when the user hovers over a trigger area.
- **on timer:** Load after a specific duration.
- **on immediate:** Load immediately after the rest of the page has finished.

Additional Blocks:
- **@placeholder:** Shown before the deferred content is loaded.
- **@loading:** Shown while the dependencies are being fetched.
- **@error:** Shown if the loading process fails.
