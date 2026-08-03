---
id: concept.nextjs-caching
title: Next.js Caching Mechanisms
slug: nextjs-caching
topic: topic.nextjs-fundamentals
description: Understanding the four caching layers in the Next.js App Router.
---
# Next.js Caching Mechanisms

Next.js provides four distinct caching layers to optimize application performance and reduce costs.

### 1. Request Memoization
React extends the `fetch` API to automatically memoize requests with the same URL and options. This lasts for the duration of a **single render pass** on the server.

### 2. Data Cache
Stores data across user requests and deployments. It is a persistent cache on the server. You can control this via `revalidate` or `cache: 'force-cache'`.

### 3. Full Route Cache
Next.js automatically caches the rendered output (HTML and RSC payload) of a route at build time or during revalidation. This reduces server work for static routes.

### 4. Router Cache (Client-side)
An in-memory cache that stores the RSC payload of visited and prefetched segments in the browser, lasting for the duration of a user session.
