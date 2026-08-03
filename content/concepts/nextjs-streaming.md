---
id: concept.nextjs-streaming
title: Next.js Streaming and Suspense
slug: nextjs-streaming
topic: topic.nextjs-fundamentals
description: How Next.js uses React Suspense to stream HTML chunks to the client for faster perceived performance.
---
# Next.js Streaming and Suspense

Streaming allows you to break down the page's HTML into smaller chunks and progressively send them from the server to the client. This is powered by **React Suspense**.

### Key Benefits
- **Faster TTFB (Time to First Byte):** The server can start sending the layout and non-dynamic parts of the page immediately while the data-heavy components are still fetching.
- **Parallel Data Fetching:** Different parts of the page can load independently. A slow API call in one component won't block the rest of the page from being interactive.
- **Improved UX:** Instead of a blank screen or a full-page spinner, users see the navigation and layout immediately, with specific loading states (skeletons) where data is missing.

### Implementation
- **`loading.js`:** A special file that automatically wraps a page or segment in a Suspense boundary.
- **Manual `<Suspense>`:** For more granular control within a page, wrapping specific components.
