---
id: variant.vue-component-props-emits.vue
question: question.vue-component-props-emits
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

Props flow from parent to child and should be treated as read-only by the child. When a child needs to request a change, it emits a typed event and the parent updates its own state. This keeps ownership clear: a component can transform a prop into local state if necessary, but it must not directly mutate the prop object or binding.

Component `v-model` is a convention built on that same one-way flow. By default, the parent passes a `modelValue` prop and listens for `update:modelValue`; the child emits the update event with the replacement value. Vue 3.5.40's `defineModel` macro declares this contract compactly in `script setup`, with generic types for the value. Named models use the corresponding named prop and update event.

`defineProps` and `defineEmits` make a component's public contract visible to TypeScript and tooling. Prefer these declarations over loosely typed event strings and avoid emitting an event to secretly mutate unrelated parent state.

# Why It Matters

Explicit component contracts prevent a child from changing data behind its parent's back. They also let TypeScript catch missing props and invalid event payloads before a component is run, which is especially important for reusable design-system components.

# Example Code

```typescript
import { defineComponent, h, type PropType, type Ref, ref } from 'vue';

interface Task {
  id: string;
  title: string;
  done: boolean;
}

export const TaskToggle = defineComponent({
  props: {
    task: { type: Object as PropType<Task>, required: true },
  },
  emits: {
    'update:done': (done: boolean): boolean => typeof done === 'boolean',
  },
  setup(props, { emit }) {
    return () => h('button', {
      onClick: () => emit('update:done', !props.task.done),
    }, props.task.done ? 'Done' : 'Open');
  },
});

const done: Ref<boolean> = ref(false);
```

# Common Mistakes

- **Mutating a prop directly:** The parent owns the prop. Direct mutation causes warnings and makes updates difficult to trace, especially when the parent rerenders.
- **Using `v-model` without emitting the matching update event:** The child UI may appear to change locally, but the parent's source of truth remains unchanged.
- **Leaving emitted payloads untyped:** Event names alone do not prevent callers from passing malformed data; type the payload to keep the component contract reliable.

# Follow-up Questions

- **What does `v-model:open` mean on a component?** (Answer: It passes an `open` prop and listens for an `update:open` event.)
- **When should a child copy a prop into local state?** (Answer: When it needs a temporary editable draft; it should synchronize deliberately and emit a final change.)

# References

- [Vue documentation: Component props](https://vuejs.org/guide/components/props.html)
- [Vue documentation: Component events and v-model](https://vuejs.org/guide/components/events.html)
- [Vue documentation: TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html)
