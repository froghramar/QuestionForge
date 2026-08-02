---
id: variant.angular-resource-api.angular
question: question.angular-resource-api
technology: tech.angular
---
# Expected Answer

The **Resource API** provides a high-level, signal-based way to fetch data. It eliminates the need for manual `subscribe`, `async` pipe, or `loading` boolean flags.

### 1. Simple Data Fetching (`resource`)
Use `resource` when you have a function that returns a Promise.

```typescript
user = resource({
  request: () => ({ id: this.userId() }), // Re-runs when userId() changes
  loader: async ({ request }) => {
    const res = await fetch(`/api/users/${request.id}`);
    return res.json();
  }
});
```

### 2. HTTP with RxJS (`rxResource`)
Use `rxResource` to integrate seamlessly with Angular's `HttpClient`. It automatically handles cancellation (like `switchMap`) when the request changes.

```typescript
products = rxResource({
  request: () => this.query(),
  loader: (q) => this.http.get<Product[]>(`/api/search?q=${q}`)
});
```

### Template Usage:
```html
@if (products.isLoading()) {
  <spinner />
} @else if (products.error()) {
  <error-msg [error]="products.error()" />
} @else {
  @for (p of products.value(); track p.id) {
    <div>{{ p.name }}</div>
  }
}
```

# Why It Matters

The Resource API is "Zoneless-ready" and extremely efficient. It reduces boilerplate by about 50-70% for common data-loading scenarios. Most importantly, it makes your components **declarative**. You describe *what* you want to fetch based on *which* signals, and Angular handles the timing, cancellation, and state transitions automatically. This leads to fewer bugs related to race conditions or forgotten loading resets.

# Common Mistakes

- **Not using the `request` parameter:** If you access a signal directly inside the `loader` instead of returning it in the `request` function, Angular might not track the dependency correctly or provide the expected cancellation behavior.
- **Overusing for complex flows:** If you need to coordinate multiple different streams with complex timing (e.g., a websocket merged with three HTTP calls), RxJS is still the better tool. Resources are for "loading a thing based on an input."
- **Forgetting `rxResource` for HTTP:** While `resource` works with `fetch`, `rxResource` is better for Angular apps because it respects the `HttpClient` interceptors and testing utilities.

# Follow-up Questions

- **What happens if the `request` returns `undefined`?** (Answer: The resource enters the `Idle` state and does not trigger the loader).
- **How do you refresh the data?** (Answer: By calling `myResource.reload()`).
- **Can you mutate the resource value locally?** (Answer: Yes, the `.value` signal is actually a `WritableSignal`, allowing for optimistic UI updates).

# References

- [Angular Docs: Resource API](https://angular.dev/guide/signals/resource)
- [Angular Blog: Simplified Data Fetching in v19](https://blog.angular.io/angular-v19-is-here)
