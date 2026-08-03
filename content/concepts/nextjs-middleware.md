---
id: concept.nextjs-middleware
title: Next.js Middleware
slug: nextjs-middleware
topic: topic.nextjs-fundamentals
description: Running code before a request is completed to modify the response or redirect the user.
---
# Next.js Middleware

Middleware allows you to run code **before a request is completed**. Based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

### Key Characteristics
- **Edge Runtime:** Middleware runs on the Edge, making it extremely fast and low-latency.
- **Filtering:** You can use a `matcher` to limit Middleware to specific paths.
- **Use Cases:** Authentication, Bot protection, A/B testing, Redirects, and Localization.
