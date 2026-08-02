---
id: variant.angular-deferrable-views.angular
question: question.angular-deferrable-views
technology: tech.angular
---
# Expected Answer

**Deferrable Views** (`@defer`) allow you to lazy-load components, directives, or pipes used in a specific part of a template. When Angular encounters a `@defer` block, it extracts the dependencies into a separate JavaScript chunk and only loads them when a specific trigger condition is met.

### The Four Parts of @defer:
1.  **`@defer`**: The main block containing the lazy-loaded content.
2.  **`@placeholder`**: Shown initially (essential for `on viewport` or `on interaction` triggers).
3.  **`@loading`**: Shown while the chunk is being fetched.
4.  **`@error`**: Fallback if the chunk fails to load.

### Key Triggers:
- **`on viewport`**: The best for performance (LCP). Loads content as the user scrolls to it.
- **`on interaction`**: Loads when the user clicks or focuses on the placeholder.
- **`on hover`**: Loads when the user hovers over the placeholder.
- **`on idle`**: The default; loads when the browser is not busy.

### Example Code:
```html
@defer (on viewport; prefetch on idle) {
  <app-heavy-chart [data]="data()" />
} @placeholder {
  <div class="skeleton">Loading chart...</div>
} @loading (after 100ms; minimum 500ms) {
  <app-spinner />
}
```

# Why It Matters

Before `@defer`, lazy-loading was tied to routing. This meant if you had a heavy component (like a code editor or a large map) in the middle of a page, you had to either load it upfront (bloating the main bundle) or use complex `ComponentFactoryResolver` logic. `@defer` makes this process declarative and easy. It directly improves **First Contentful Paint (FCP)** and **Total Blocking Time (TBT)** by keeping the initial JavaScript payload small.

# Common Mistakes

- **Not providing a placeholder for viewport/interaction triggers:** If there's no placeholder, the `@defer` block has zero height, so it might technically be "in the viewport" immediately, defeating the purpose.
- **Nesting `@defer` blocks excessively:** This can lead to a "pop-in" effect that hurts Cumulative Layout Shift (CLS) if heights aren't managed correctly.
- **Overusing `@defer` for tiny components:** The overhead of an extra HTTP request might be higher than the benefit of lazy-loading a small 2KB component.

# Follow-up Questions

- **How does `@defer` work with SSR?** (Answer: By default, the server renders the `@placeholder`. The client then hydrates the placeholder and triggers the defer logic based on the condition).
- **What is the `prefetch` keyword?** (Answer: It allows you to download the JavaScript chunk earlier—e.g., when the browser is idle—even if the trigger condition hasn't been met yet, making the eventual transition instantaneous).
- **Can I trigger defer manually?** (Answer: Yes, by using the `when` trigger followed by a boolean expression: `@defer (when shouldShow())`).

# References

- [Angular Docs: Deferrable Views](https://angular.dev/guide/templates/defer)
- [Angular Blog: A new era for Angular Core Web Vitals](https://blog.angular.io/introducing-angular-v17-4171657803d0)

