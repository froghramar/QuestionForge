---
id: variant.angular-view-transitions.angular
question: question.angular-view-transitions
technology: tech.angular
---
# Expected Answer

Angular supports the native **View Transitions API**, allowing for seamless animations between route changes. This is enabled globally in the router configuration and customized via CSS.

### 1. Enabling the Feature
In your `app.config.ts`, add `withViewTransitions()` to the `provideRouter` call:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions())
  ]
};
```

### 2. Customizing the Animation
The browser uses pseudo-elements to represent the old and new states. You can target these in your global CSS:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.5s;
}

/* Slide effect */
::view-transition-old(root) {
  animation: 0.3s ease-out both fade-out, 0.3s ease-out both slide-to-left;
}
::view-transition-new(root) {
  animation: 0.3s ease-in both fade-in, 0.3s ease-in both slide-from-right;
}
```

# Why It Matters

Native View Transitions are highly performant because the browser handles the snapshotting and layering of the DOM nodes. It eliminates the "jank" often associated with JavaScript-based animations that move large parts of the DOM. For developers, it drastically reduces the amount of code needed to create common transitions like cross-fades or slides between pages.

# Common Mistakes

- **Forgetting Global Styles:** View transition pseudo-elements live at the root level, so styles must usually be in your global `styles.css`, not scoped to a component (unless using `:host ::ng-deep`, which is discouraged).
- **Ignoring Browser Support:** While most modern browsers support it, you should ensure your layout doesn't break if the transition is skipped in older browsers.
- **Naming Conflicts:** If you use the `view-transition-name` property to animate specific elements (like a hero image) between pages, the name must be unique on the page.

# Follow-up Questions

- **Can you disable transitions for specific routes?** (Answer: Yes, you can pass an object to `withViewTransitions` with a `skipTransition` function that evaluates the navigation).
- **How does it handle async data?** (Answer: The router waits for all resolvers and lazy-loaded components to be ready before starting the transition).
- **Does it work with SSR?** (Answer: The transition itself happens on the client, but Angular ensures the hydration process doesn't interfere with the animation timing).

# References

- [Angular Docs: View Transitions](https://angular.dev/guide/routing/common-router-tasks#view-transitions)
- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

