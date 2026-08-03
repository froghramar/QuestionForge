---
id: variant.nextjs-instrumentation.nextjs
question: question.nextjs-instrumentation
technology: tech.nextjs
---

# Expected Answer

Next.js provides an **`instrumentation.ts`** (or `.js`) file that allows you to hook into the Next.js server lifecycle.

**Key Features:**
- **The `register()` function:** You export a function named `register` from this file. It is called exactly once when the server starts.
- **Environment Awareness:** The file can be used to set up different monitoring for different runtimes (Node.js vs. Edge).
- **OpenTelemetry:** Next.js has first-class support for OTEL. You can enable it in `next.config.js` (`experimental.instrumentationHook: true`) and use the `register` function to initialize an OTEL SDK.

# Why It Matters

Using `instrumentation.ts` is the cleanest way to set up global monitoring. Before this feature, developers often had to "hack" layout files or use custom servers, which was brittle and didn't work well with the App Router's execution model.

# Example Code

### Enabling in Config
```javascript
// next.config.js
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
}
```

### The Instrumentation File
```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    // Initialize your monitoring tool here
  }
}
```

# Common Mistakes

- **Forgetting the config flag:** `instrumentation.ts` will not run unless `experimental.instrumentationHook` is true.
- **Putting too much logic in `register`:** This function blocks the server from starting until it completes. It should only be used for initialization.
- **Confusing it with Middleware:** Middleware runs on every request; `instrumentation` runs once on startup.

# Follow-up Questions

- **Can you use `instrumentation.ts` in the Edge runtime?** (Answer: Yes, you can check `process.env.NEXT_RUNTIME` to run runtime-specific code).
- **What is a "Span" in OpenTelemetry?** (Answer: A span represents a single operation within a trace, like a database query or an HTTP request).

# References

- [Next.js Documentation: Instrumentation](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)
- [Next.js Documentation: OpenTelemetry](https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry)
