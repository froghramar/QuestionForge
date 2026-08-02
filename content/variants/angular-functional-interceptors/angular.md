---
id: variant.angular-functional-interceptors.angular
question: question.angular-functional-interceptors
technology: tech.angular
---
# Expected Answer

**Functional Interceptors** (introduced in Angular 15) are a modern alternative to the traditional class-based `HttpInterceptor`. They allow you to define interceptor logic as simple functions, making them more lightweight, easier to test, and more tree-shakeable.

### Key Differences:

1.  **Definition:** Functional interceptors are defined as constants of type `HttpInterceptorFn`. Class-based interceptors implement the `HttpInterceptor` interface.
2.  **Configuration:** Functional interceptors are registered via `provideHttpClient(withInterceptors([myInterceptor]))`. Class-based interceptors require a provider with the `HTTP_INTERCEPTORS` multi-token.
3.  **Dependencies:** Instead of constructor injection, functional interceptors use the `inject()` function to access services.
4.  **Composition:** Functions are naturally easier to compose and share than classes.

### Example Code:

**Functional Interceptor (Modern):**
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};

// Application Config
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

# Why It Matters

The shift to functional interceptors is part of Angular's broader move toward a more "standalone" and functional architecture. They reduce the boilerplate significantly—you no longer need a separate file and a class for a simple 5-line header injection. From a performance standpoint, functions are easier for modern JavaScript bundlers (like Esbuild or Vite) to optimize and tree-shake, potentially leading to smaller application bundles.

# Common Mistakes

- **Using constructor injection:** Functional interceptors are not classes; you *must* use `inject(MyService)` to get dependencies.
- **Forgetting to return `next(req)`:** If you don't return the result of the `next()` call, the HTTP request will hang and never be sent.
- **Mixing configuration methods:** You should avoid using both `HTTP_INTERCEPTORS` providers and `withInterceptors()` in the same app if possible, as it makes the request flow harder to reason about.

# Follow-up Questions

- **How do you handle errors in a functional interceptor?** (Answer: By using the `pipe()` and `catchError()` operators on the observable returned by `next(req)`).
- **Can functional interceptors be lazy-loaded?** (Answer: Yes, interceptors configured in a child injector—via `provideHttpClient` in a lazy-loaded route—will only apply to requests made from that branch of the application).
- **What is the execution order of interceptors?** (Answer: They execute in the order they are provided in the `withInterceptors` array).

# References

- [Angular Docs: Intercepting requests and responses](https://angular.dev/guide/http/interceptors)
- [Angular Docs: Functional interceptors](https://angular.dev/guide/http/interceptors#functional-interceptors)
