---
id: variant.vue-computed-vs-watch.vue
question: question.vue-computed-vs-watch
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

Use `computed` for a value that can be derived synchronously from reactive state. Vue tracks the dependencies used by the getter, caches its result, and recalculates only when one of those dependencies changes. A computed value should be free of side effects: reading it must not fetch data, mutate unrelated state, or write to storage.

Use `watch` when a source change needs an imperative side effect, such as fetching a resource, synchronizing query parameters, or calling a browser API. `watch` tracks only the source explicitly provided, gives access to old and new values, and supports cleanup. `watchEffect` is useful for a short effect where Vue can infer dependencies from the synchronous reads in its callback, but its implicit dependency list makes it less suitable when precision matters.

For asynchronous watchers, register cleanup with `onCleanup` before awaiting. That prevents a stale request from committing results after the source has changed again. In Vue 3.5.40, this distinction keeps rendering predictable while still giving application code a controlled place for side effects.

# Why It Matters

Putting side effects in computed getters makes rendering non-deterministic and can repeat expensive work whenever the value is read. Conversely, using watchers for simple derived display state adds asynchronous timing and mutable state that Vue can calculate automatically.

# Example Code

```typescript
import { computed, ref, watch } from 'vue';

interface SearchResult {
  id: string;
  title: string;
}

const query = ref<string>('');
const normalizedQuery = computed(() => query.value.trim().toLowerCase());
const results = ref<SearchResult[]>([]);

watch(normalizedQuery, async (term, _previous, onCleanup) => {
  const controller = new AbortController();
  onCleanup(() => controller.abort());

  if (!term) {
    results.value = [];
    return;
  }

  const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`, {
    signal: controller.signal,
  });
  results.value = (await response.json()) as SearchResult[];
});
```

# Common Mistakes

- **Fetching or mutating state inside `computed`:** A getter can be read many times and should remain deterministic; side effects there create duplicate requests and hard-to-debug updates.
- **Watching an entire object when only one field matters:** Deep watching broad state can be costly and trigger unrelated work. Watch a specific getter or ref instead.
- **Ignoring stale async work:** Without cleanup or an equivalent request identity check, a slower older response can overwrite results for a newer query.

# Follow-up Questions

- **What does computed caching depend on?** (Answer: Vue invalidates the cached result only when a reactive dependency read by its getter changes.)
- **When is `watchEffect` preferable to `watch`?** (Answer: For concise effects whose dependencies are naturally discovered from synchronous reads and do not need old values.)

# References

- [Vue documentation: Computed properties](https://vuejs.org/guide/essentials/computed.html)
- [Vue documentation: Watchers](https://vuejs.org/guide/essentials/watchers.html)
