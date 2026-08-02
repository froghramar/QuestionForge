---
id: variant.angular-zoneless.angular
question: question.angular-zoneless
technology: tech.angular
---
# Expected Answer

**Zoneless Angular** is an architecture where the framework no longer relies on `Zone.js` to monkey-patch browser APIs and detect changes. Instead, it relies on explicit signals or manual notifications to schedule change detection.

### 1. Enabling Zoneless
In your `app.config.ts`, replace the default provider with `provideZonelessChangeDetection()` (stabilized in v22) and remove `zone.js` from your `polyfills` in `angular.json`.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
```

### 2. How it Works
In a Zoneless app, Angular doesn't automatically check the UI after every click or timer. Change detection is triggered by:
- A **Signal** being updated (if it's used in a template).
- A component being attached/detached.
- Manually calling `ChangeDetectorRef.markForCheck()`.
- The `AsyncPipe` receiving a new value.

### 3. Key Benefits
- **Performance:** No overhead of monkey-patching every browser API.
- **Bundle Size:** You save about 13KB (gzipped) by removing `zone.js`.
- **Debugging:** Stack traces are much cleaner and more readable without the deep `zone.js` call stacks.
- **Predictability:** Updates only happen when they are actually needed.

# Why It Matters

Zoneless represents the final step in Angular's modernization. It makes the framework more compatible with standard web components and other micro-frontend architectures. For developers, it enforces better coding practices—you can't rely on "accidental" change detection anymore. Everything must be reactive (Signals) or explicitly handled.

# Common Mistakes

- **Direct mutations in non-reactive code:** In a Zoneless app, `this.name = 'John'` in a click handler will **not** update the UI if `name` is a plain property and not a Signal.
- **Incompatible libraries:** Some older libraries (like certain versions of Google Maps or D3 wrappers) might expect Angular to automatically "see" changes they make. In Zoneless, you might need to wrap these in a call to `markForCheck()`.
- **Assuming `ngZone.run()` still works:** While the service still exists for compatibility, it does nothing in a truly Zoneless application.

# Follow-up Questions

- **What is the difference between `markForCheck()` and `detectChanges()` in Zoneless?** (Answer: Both trigger a check, but `markForCheck()` is usually preferred as it schedules the check for the next animation frame, whereas `detectChanges()` is synchronous and potentially expensive).
- **Does Zoneless require Signals?** (Answer: Technically no, but building a Zoneless app without Signals is difficult because you'd have to manually trigger change detection for almost every interaction).
- **How does it affect SSR?** (Answer: It improves SSR performance significantly because the server doesn't have to manage a Zone tree for every request).

# References

- [Angular Docs: Zoneless Change Detection](https://angular.dev/guide/experimental/zoneless)
- [Angular Blog: The Signal-powered Future](https://blog.angular.io/angular-v18-is-now-available-e79d51fcdb19)
