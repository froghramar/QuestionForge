---
id: variant.vue-keep-alive.vue
question: question.vue-keep-alive
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

`KeepAlive` caches inactive dynamic component instances instead of unmounting them. When the active component switches, the outgoing instance is deactivated and removed from the visible DOM, but its reactive state and subtree remain in memory. Returning to it activates the same instance, so form entries, scroll-related state, and in-memory data can be restored without reconstructing the view.

This changes lifecycle behavior. `onUnmounted` does not run when a cached component is merely hidden; use `onDeactivated` to pause polling, observers, or expensive work and `onActivated` to resume it. The component is only unmounted when it is evicted from the cache or its enclosing `KeepAlive` is unmounted. `include`, `exclude`, and `max` constrain what is cached and how many instances are retained.

In Vue 3.5.40, use `KeepAlive` for a small set of views where resuming state is valuable. Do not cache every route automatically: retained instances use memory, may keep stale data, and can continue external work unless activation hooks manage it.

# Why It Matters

Appropriate caching makes multi-step forms and tabbed interfaces feel instant. Unbounded caching or failing to pause deactivated work can increase memory usage and leave hidden views polling or reacting unnecessarily.

# Example Code

```typescript
import { KeepAlive, computed, defineComponent, h, ref, type Component } from 'vue';

declare const AccountPanel: Component;
declare const BillingPanel: Component;

export const SettingsTabs = defineComponent({
  setup() {
    const active = ref<'account' | 'billing'>('account');
    const current = computed<Component>(() =>
      active.value === 'account' ? AccountPanel : BillingPanel,
    );

    return () => h('section', [
      h('button', { onClick: () => { active.value = 'account'; } }, 'Account'),
      h('button', { onClick: () => { active.value = 'billing'; } }, 'Billing'),
      h(KeepAlive, { max: 2 }, { default: () => h(current.value) }),
    ]);
  },
});
```

# Common Mistakes

- **Expecting `onUnmounted` when switching cached tabs:** The component is deactivated, not destroyed, so use `onDeactivated` for temporary cleanup.
- **Caching unbounded user-generated views:** Each cached instance consumes memory; set `max` or avoid caching when many unique views are possible.
- **Leaving polling active while deactivated:** Hidden components can waste network and CPU unless polling is paused in `onDeactivated`.

# Follow-up Questions

- **What does `max` do on KeepAlive?** (Answer: It bounds the cache size and evicts the least recently used cached instance when needed.)
- **Does KeepAlive preserve server state?** (Answer: No. It preserves a client-side component instance; data still needs appropriate fetching and invalidation.)

# References

- [Vue documentation: KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)
