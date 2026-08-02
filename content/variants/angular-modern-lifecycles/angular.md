---
id: variant.angular-modern-lifecycles.angular
question: question.angular-modern-lifecycles
technology: tech.angular
---
# Expected Answer

**`afterRender`** and **`afterNextRender`** are modern lifecycle hooks introduced in Angular 17. They provide a safer and more precise way to interact with the DOM compared to the older `ngAfterViewInit` hook.

### Key Differences:

1.  **SSR Safety:** `ngAfterViewInit` runs on the server (during SSR), which often leads to crashes if you access `window` or `document`. `afterRender` and `afterNextRender` **never run on the server**, making them safe by default.
2.  **Timing:** `ngAfterViewInit` runs after the component's view has been initialized but *not* necessarily after the browser has layouted or painted the page. The new hooks run specifically after the rendering process is complete.
3.  **Frequency:**
    - `afterRender`: Runs after *every* subsequent change detection cycle.
    - `afterNextRender`: Runs *once* after the next change detection cycle.

### Example Code:
```typescript
@Component({...})
export class ChartComponent {
  private elementRef = inject(ElementRef);

  constructor() {
    // Safely initialize a 3rd party library that needs the DOM
    afterNextRender(() => {
      const chart = new D3Chart(this.elementRef.nativeElement);
      chart.render();
    });
  }
}
```

# Why It Matters

Using these hooks correctly is essential for building modern, performant, and universal (SSR) Angular applications. They eliminate the need for `isPlatformBrowser` checks throughout your code when you need to touch the DOM. Furthermore, they are designed to work perfectly with **Zoneless change detection**, where precise timing of DOM synchronization is even more important than in traditional `Zone.js` apps.

# Common Mistakes

- **Using them outside the constructor:** These hooks must be called within an **injection context** (usually the constructor or a field initializer) unless you manually pass an `Injector`.
- **Overusing `afterRender`:** Since it runs after every cycle, putting heavy logic in `afterRender` can cause significant performance degradation. Most one-time initialization should use `afterNextRender`.
- **Infinite Loops:** If you update a signal or a property inside `afterRender` that triggers a new change detection cycle, you will create an infinite loop.

# Follow-up Questions

- **Can you use `afterRender` to measure elements?** (Answer: Yes, it's the ideal place as it ensures the DOM is in its final state for the current cycle).
- **Does `afterNextRender` run during hydration?** (Answer: Yes, it runs after the hydration process has finished and the component is stable in the browser).
- **What are the phase options?** (Answer: You can specify a phase like `early`, `read`, or `write` to further optimize DOM interactions and avoid layout thrashing).

# References

- [Angular Docs: afterRender and afterNextRender](https://angular.dev/api/core/afterRender)
- [Angular Blog: New lifecycle hooks in v17](https://blog.angular.io/introducing-angular-v17-4171657803d0)

