---
id: variant.vue-composables.vue
question: question.vue-composables
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

A composable is a regular TypeScript function, normally named with `use`, that calls Composition API functions and returns a focused reactive API. It packages behavior rather than a component template: for example, a `useEventListener` composable can register an event listener and clean it up, while callers decide how to render the result. The function should return the refs, computed values, and actions consumers need instead of exposing its internal implementation.

State declared inside the composable function is created for each caller, so two components using it receive independent state. State declared at module scope is shared by every caller; that can implement a small global store intentionally, but accidental module-level state causes cross-component leakage. Lifecycle hooks used by a composable attach to the component that calls it, so invoke lifecycle-dependent composables synchronously during component setup.

In Vue 3.5.40, composables are the preferred alternative to mixins for reusable stateful logic because their inputs, outputs, and dependencies are explicit and naturally typed with TypeScript.

# Why It Matters

Composables prevent repeated event cleanup, request state, and derived-state code across components. A poorly scoped composable can instead leak state between users or leave listeners active after unmount, causing incorrect UI and memory leaks.

# Example Code

```typescript
import { onUnmounted, readonly, ref, type Ref } from 'vue';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePosition {
  position: Readonly<Ref<MousePosition>>;
}

export function useMousePosition(): UseMousePosition {
  const position = ref<MousePosition>({ x: 0, y: 0 });
  const updatePosition = (event: MouseEvent): void => {
    position.value = { x: event.clientX, y: event.clientY };
  };

  window.addEventListener('mousemove', updatePosition);
  onUnmounted(() => window.removeEventListener('mousemove', updatePosition));

  return { position: readonly(position) };
}
```

# Common Mistakes

- **Creating state at module scope unintentionally:** Every caller then reads and writes the same ref, so one component can unexpectedly change another component's state.
- **Forgetting lifecycle cleanup:** A listener, timer, or subscription continues after unmount and can leak memory or update a component that no longer exists.
- **Calling a lifecycle-dependent composable after an `await`:** The active component instance is no longer guaranteed, so lifecycle hooks may not register with the intended component.

# Follow-up Questions

- **How can a composable intentionally share state?** (Answer: Define the shared ref at module scope or use a dedicated store, then make the ownership explicit.)
- **How would you test this composable?** (Answer: Invoke it in a mounted test component or effect scope, dispatch a mouse event, assert the returned ref, and unmount to verify cleanup.)

# References

- [Vue documentation: Composables](https://vuejs.org/guide/reusability/composables.html)
- [Vue documentation: Lifecycle hooks](https://vuejs.org/api/composition-api-lifecycle.html)
