---
id: variant.angular-ssr-hydration.angular
question: question.angular-ssr-hydration
technology: tech.angular
---
# Expected Answer

**Traditional SSR** in Angular (prior to v16) was "destructive." The server would send the HTML, the browser would display it, and then the Angular client-side application would boot up, destroy that HTML, and replace it with freshly rendered DOM. This caused a visible "flicker" and lost any user state (like input focus or scroll position).

**Modern Client-side Hydration** (v17+) is "non-destructive." Angular avoids re-rendering the DOM from scratch. Instead, it traverses the existing DOM nodes sent by the server and attaches event listeners and internal data structures to them.

### Key Benefits:
1.  **No Flicker:** The UI stays stable as the app becomes interactive.
2.  **Lighthouse Scores:** Significant improvements in First Contentful Paint (FCP) and Cumulative Layout Shift (CLS).
3.  **Preserved State:** Since the DOM isn't replaced, things like focus and selection are easier to maintain.

### How to Enable:
In your `app.config.ts`:
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration()
  ]
};
```

# Why It Matters

Hydration is the bridge between fast initial loading (SSR) and a smooth, interactive single-page application experience. Without hydration, users often experience a "uncanny valley" where the page looks ready but doesn't respond to clicks for several seconds. Modern hydration minimizes this gap and makes Angular competitive with other frameworks like Next.js in terms of SEO and perceived performance.

# Common Mistakes

- **Direct DOM Manipulation:** Using `document.getElementById` or `window` directly. Since the server doesn't have a `window` object, the app will crash on the server. Always use `PLATFORM_ID` and `isPlatformBrowser` to check the environment.
- **DOM Mismatch:** If your template logic uses `Math.random()` or `new Date()`, the server and client might render different values. This causes a "Hydration Mismatch" error, and Angular may fall back to destructive rendering for that part of the tree.
- **Accessing Browser APIs in `ngOnInit`:** `ngOnInit` runs on both the server and the client. If you need browser-only logic, move it to `afterRender` or `afterNextRender` (new in v17).

# Follow-up Questions

- **What are `afterRender` and `afterNextRender`?** (Answer: They are lifecycle hooks that *only* run on the client, specifically designed for DOM-dependent logic after hydration).
- **How do you avoid duplicate HTTP calls?** (Answer: Use `TransferState` or let the `HttpClient` handle it automatically when `withFetch()` is used).
- **Can you hydrate only part of the app?** (Answer: Currently, hydration is mostly all-or-nothing for the whole page, but you can use the `ngSkipHydration` attribute to tell Angular to use destructive rendering for specific components).

# References

- [Angular Docs: Hydration](https://angular.dev/guide/hydration)
- [Angular Docs: SSR Guide](https://angular.dev/guide/ssr)

