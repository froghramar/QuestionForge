---
id: variant.vue-composition-api-vs-options-api.vue
question: question.vue-composition-api-vs-options-api
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

Vue 3 supports both the Options API and the Composition API, and neither is deprecated. The Options API organizes code by framework option: state in `data`, derived values in `computed`, and handlers in `methods`. It is approachable for small components because each concern has an obvious location.

The Composition API organizes code by feature instead. A search feature can keep its query, loading state, request function, and derived results together in `setup()`. That organization scales better when a component has several unrelated features, and the feature can be extracted into a composable. It also works naturally with TypeScript because refs, functions, interfaces, and generics are regular TypeScript values.

In Vue 3.5.40, `script setup` is the common Composition API authoring syntax, although ordinary `setup()` is equivalent at runtime. Choose the API that makes the component clearest and is consistent with the codebase; teams can mix them. For new, reusable, or type-heavy application code, Composition API is usually the preferred default.

# Why It Matters

Organizing a large component only by `data`, `methods`, and `watch` spreads one feature across the file, which makes changes and extraction harder. Composition API lets a team encapsulate a feature in a composable with a narrow typed interface, reducing duplicated lifecycle and state-management code.

# Example Code

### A typed composable used by a component

```typescript
import { computed, ref, type Ref } from 'vue';

interface UseCounter {
  count: Ref<number>;
  doubled: Readonly<Ref<number>>;
  increment: () => void;
}

export function useCounter(initial = 0): UseCounter {
  const count = ref<number>(initial);
  const doubled = computed(() => count.value * 2);
  const increment = (): void => {
    count.value += 1;
  };

  return { count, doubled, increment };
}
```

# Common Mistakes

- **Claiming the Options API is obsolete:** Vue 3.5.40 continues to support it. Treating it as invalid creates needless migration work and ignores its value for simple components.
- **Extracting every local variable into a composable:** A composable should represent reusable, coherent behavior. Splitting a small component into many one-line helpers obscures the feature instead of clarifying it.
- **Calling a composable outside component setup when it uses lifecycle hooks:** Hooks such as `onMounted` need an active component instance; calling such a composable later loses lifecycle registration.

# Follow-up Questions

- **Why are composables generally better than mixins?** (Answer: Their dependencies and returned API are explicit, avoiding mixin name collisions and hidden behavior.)
- **Can Options API components use composables?** (Answer: Yes. A component can return values from `setup()` for use by Options API templates and options.)

# References

- [Vue documentation: Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue documentation: TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html)
