---
id: question.nextjs-instrumentation
title: Instrumentation & Monitoring (OpenTelemetry)
slug: nextjs-instrumentation
difficulty: Hard
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-instrumentation
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

At scale, knowing "it works" isn't enough. You need to know *how well* it works. Next.js's support for `instrumentation.ts` and OpenTelemetry is a powerful feature for enterprise-level applications. Interviewers want to see if you can think beyond the code and into the operations and observability of the system.

## Key Concepts

- **The `register` function:** How it runs on server startup.
- **OpenTelemetry (OTEL):** What it is and how Next.js supports it.
- **Tracing:** Tracking a request across multiple services.
- **`next.config.js` integration:** Enabling the `instrumentationHook`.

## Question Variations

- "What is the purpose of the `instrumentation.ts` file in Next.js?"
- "How would you integrate a monitoring tool like Sentry or New Relic into a modern Next.js app?"
- "How does Next.js support OpenTelemetry?"
- "Why would you use the `register` function instead of just initializing tools in a layout?"
