---
id: variant.vue-ref-vs-reactive.vue
question: question.vue-ref-vs-reactive
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

`ref` and `reactive` both participate in Vue's dependency tracking, but they model state differently. `ref` stores one value in a container, accessed as `.value` in TypeScript code. It can hold primitives, objects, arrays, or functions, and assigning a new value to `.value` remains reactive. Vue automatically unwraps refs in templates and in many reactive-object property accesses.

`reactive` takes a non-primitive object or array and returns a Proxy. Read and write its properties directly. It is convenient for a cohesive object whose individual fields change, but it has no replaceable wrapper: assigning a different object to the variable does not update consumers of the original proxy. For this reason, `ref` is often the most flexible default, especially when state may be replaced after loading a response.

Do not destructure a reactive object's properties into plain variables: that captures current values and bypasses proxy access. Use `toRefs` or `toRef` when a property must be passed or returned as an independent ref.

# Why It Matters

Choosing the wrong shape can produce UI that silently stops updating. In particular, replacing a reactive object or destructuring it commonly disconnects the template or composable consumer from Vue's tracked proxy.

# Example Code

```typescript
import { reactive, ref, toRefs, type Ref } from 'vue';

interface Profile {
  name: string;
  roles: string[];
}

const page = ref<number>(1);
const profile = ref<Profile>({ name: 'Ada', roles: ['admin'] });
profile.value = { name: 'Grace', roles: ['editor'] };

const filters = reactive({ query: '', pageSize: 20 });
const { query, pageSize } = toRefs(filters);

const currentPage: Ref<number> = page;
query.value = 'vue';
```

# Common Mistakes

- **Forgetting `.value` in TypeScript code:** `page += 1` tries to replace the ref binding. Use `page.value += 1`; templates perform unwrapping for you.
- **Using `reactive` for a primitive:** Primitives cannot be proxied. Use `ref(false)`, `ref('')`, or `ref(0)`.
- **Destructuring `reactive` without `toRefs`:** `const { query } = filters` creates a non-reactive snapshot, so later changes to `filters.query` are not reflected through `query`.

# Follow-up Questions

- **When should an object use `ref` rather than `reactive`?** (Answer: Use `ref` when the whole object may be replaced, or when a uniform `.value` API is clearer.)
- **What does `toRef(filters, 'query')` do?** (Answer: It returns one ref linked to the `query` property of the reactive object.)

# References

- [Vue documentation: Reactivity fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue documentation: Reactivity utilities](https://vuejs.org/api/reactivity-utilities.html)
