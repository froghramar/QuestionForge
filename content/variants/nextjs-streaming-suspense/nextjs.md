---
id: variant.nextjs-streaming-suspense.nextjs
question: question.nextjs-streaming-suspense
technology: tech.nextjs
---

# Expected Answer

Streaming works by breaking the page's HTML into chunks. The server sends the "shell" (layouts, static content) immediately, and then streams the rest as data becomes available.

**Key Techniques:**
1.  **`loading.js`:** By creating a `loading.js` file in a route folder, Next.js automatically wraps the `page.js` (and any nested children) in a React Suspense boundary. It displays the loading UI until the page is ready.
2.  **Manual Suspense:** For more control, you can wrap individual components in `<Suspense fallback={<Skeleton />}>`. This is useful when you have multiple data-heavy components and don't want the slowest one to delay the entire page.

**SEO Note:** Streaming is SEO-friendly. Next.js will wait for data fetching in Server Components to complete before finishing the stream. Search engines see the final rendered content, but users see the layout faster.

# Why It Matters

In a traditional SSR model, the user sees nothing until *all* data for the page is fetched. If one microservice takes 2 seconds, the whole page is blank for 2 seconds. Streaming allows the user to start interacting with the parts of the page that are ready.

# Example Code

### Granular Suspense

**TypeScript**
```typescript
import { Suspense } from 'react';
import { FastComponent, SlowComponent } from './components';

export default function Page() {
  return (
    <section>
      <h1>My Dashboard</h1>
      <FastComponent />
      <Suspense fallback={<p>Loading stats...</p>}>
        <SlowComponent />
      </Suspense>
    </section>
  );
}
```

**JavaScript**
```javascript
import { Suspense } from 'react';
import { FastComponent, SlowComponent } from './components';

export default function Page() {
  return (
    <section>
      <h1>My Dashboard</h1>
      <FastComponent />
      <Suspense fallback={<p>Loading stats...</p>}>
        <SlowComponent />
      </Suspense>
    </section>
  );
}
```

# Common Mistakes

- **Not using Skeletons:** A simple "Loading..." text can be jarring. Skeletons provide a better visual cue of what the content will look like.
- **Over-nesting Suspense:** Too many loading spinners can make the UI feel chaotic. It's often better to group related components into a single boundary.
- **Forgetting that layouts aren't wrapped by `loading.js`:** The `loading.js` only wraps the `page.js` and nested segments. The layout itself is sent immediately.

# Follow-up Questions

- **What happens if an error occurs during streaming?** (Answer: Next.js will try to render the closest `error.js` boundary).
- **Can you stream on the client side?** (Answer: Suspense works on the client too, but "Streaming" in Next.js specifically refers to the server-to-client transfer of HTML).

# References

- [Next.js Documentation: Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
