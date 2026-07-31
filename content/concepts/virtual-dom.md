---
id: concept.virtual-dom
title: Virtual DOM & Reconciliation
slug: virtual-dom
topic: topic.react-fundamentals
description: How React updates the UI efficiently using an in-memory representation.
---
# Virtual DOM
The Virtual DOM is a programming concept where an "ideal", or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called **reconciliation**.

Key benefits:
- **Batching:** Multiple updates are grouped together.
- **Diffing:** Only the changed parts of the DOM are updated.
