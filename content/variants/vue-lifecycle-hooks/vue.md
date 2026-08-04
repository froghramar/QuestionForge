---
id: variant.vue-lifecycle-hooks.vue
question: question.vue-lifecycle-hooks
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

Composition API lifecycle hooks attach work to a component instance. Put DOM-dependent initialization, such as measuring an element or registering a browser listener, in `onMounted` because the component's DOM exists at that point. Put the matching cleanup in `onUnmounted` so listeners, timers, subscriptions, and third-party instances do not outlive the component.

Hooks must be registered synchronously while the component is executing `setup()`. Calling a hook after an `await` can lose the active component instance, so Vue cannot associate cleanup with the correct component. Keep reactive calculations in `computed` or `watch` rather than using lifecycle hooks as a general update mechanism. `onUpdated` is for rare post-DOM-update integration work and must not mutate state, which could create a render loop.

For SSR, `onMounted` and `onUnmounted` do not run on the server. Browser APIs should therefore be accessed from mounted hooks or guarded appropriately. Vue 3.5.40 provides `onActivated` and `onDeactivated` for components cached by `KeepAlive`.

# Why It Matters

Incorrect lifecycle management leaks event listeners and subscriptions, causing duplicate handlers and retained memory after navigation. It also causes SSR failures when browser-only APIs are accessed during server rendering.

# Example Code

```typescript
import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export function useWindowWidth(): Readonly<Ref<number>> {
  const width = ref<number>(0);
  const updateWidth = (): void => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
  });
  onUnmounted(() => window.removeEventListener('resize', updateWidth));

  return width;
}
```

# Common Mistakes

- **Registering cleanup only in a click handler:** The listener then survives if the component unmounts before the user clicks, leaking resources.
- **Reading `window` during setup for SSR code:** Setup can run on the server, where `window` does not exist.
- **Mutating reactive state inside `onUpdated`:** The mutation schedules another update and can create an infinite update cycle.

# Follow-up Questions

- **When does `onMounted` run relative to child components?** (Answer: It runs after the component and its synchronous child components have mounted.)
- **What hook handles a cached view becoming visible again?** (Answer: `onActivated`, paired with `onDeactivated` when it becomes inactive.)

# References

- [Vue documentation: Lifecycle hooks](https://vuejs.org/api/composition-api-lifecycle.html)
