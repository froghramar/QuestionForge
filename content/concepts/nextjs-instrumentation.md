---
id: concept.nextjs-instrumentation
title: Instrumentation and Monitoring
slug: nextjs-instrumentation
topic: topic.nextjs-fundamentals
description: Using the instrumentation file and OpenTelemetry to monitor Next.js application performance and errors.
---
# Next.js Instrumentation and Monitoring

Instrumentation is the process of using code to integrate monitoring and logging tools into your application.

### The `instrumentation.ts` File
Next.js provides a special `instrumentation.ts` file in the root directory (or `src/`) that runs once when a new Next.js server instance is started. This is the place to:
- Initialize monitoring tools (Sentry, New Relic, etc.).
- Configure **OpenTelemetry (OTEL)** for distributed tracing.
- Run any necessary side effects on server startup.

### OpenTelemetry
Next.js has built-in support for OpenTelemetry, allowing you to export spans and traces to observability platforms. This helps in debugging slow database queries or API calls across different services.
