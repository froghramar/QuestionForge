---
id: variant.vue-async-components-suspense.vue
question: question.vue-async-components-suspense
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

An async component defers loading a component definition, usually through a dynamic import passed to `defineAsyncComponent`. This creates a code-splitting boundary: the component's JavaScript is fetched only when Vue needs to render it. The async loader can define its own loading, delay, timeout, error, and retry behavior.

`Suspense` is a rendering coordination boundary. It can show fallback content while its default slot contains unresolved asynchronous dependencies, including an async component configured to suspend or a component with asynchronous setup. Once all dependencies for the boundary resolve, Vue displays the default content. These are related but separate: an async component controls how code is loaded, while Suspense coordinates what the user sees while async dependencies are pending.

In Vue 3.5.40, place a suspense boundary around a meaningful UI unit so the fallback does not unnecessarily hide already useful page content. Handle failure deliberately: a dynamic import can fail due to network or deployment issues, and an error component or retry policy should give users a recovery path.

# Why It Matters

Lazy loading can reduce initial JavaScript and improve startup performance, but poorly placed loading boundaries create blank pages or confusing layout shifts. Robust error handling is essential because dynamic chunks are independent network requests.

# Example Code

```typescript
import { Suspense, defineAsyncComponent, defineComponent, h } from 'vue';

const AsyncProfile = defineAsyncComponent({
  loader: () => import('./ProfilePanel.vue'),
  delay: 200,
  timeout: 10_000,
});

export const ProfileSection = defineComponent({
  setup() {
    return () => h(Suspense, null, {
      default: () => h(AsyncProfile),
      fallback: () => h('p', 'Loading profile…'),
    });
  },
});
```

# Common Mistakes

- **Treating an async component as an automatic loading UI:** The loader fetches code; the application still needs an intentional fallback or loading component.
- **Putting one Suspense boundary around the entire application:** A single slow feature can hide unrelated content that could have rendered immediately.
- **Ignoring chunk-load failures:** A deployment mismatch or offline user can make `import()` fail, so provide an error path or retry strategy.

# Follow-up Questions

- **What does Suspense wait for?** (Answer: Asynchronous dependencies in its default slot, such as async setup and suspensible async components.)
- **How can an async component report failure?** (Answer: Configure `errorComponent` or use `onError` to retry or fail after a chosen number of attempts.)

# References

- [Vue documentation: Async components](https://vuejs.org/guide/components/async.html)
- [Vue documentation: Suspense](https://vuejs.org/guide/built-ins/suspense.html)
