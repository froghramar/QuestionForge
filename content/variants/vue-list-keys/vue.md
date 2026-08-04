---
id: variant.vue-list-keys.vue
question: question.vue-list-keys
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

A key gives Vue stable identity for each sibling in a rendered list. When data changes, Vue uses the key to match an item from the old render to the corresponding item in the new render. That allows it to move the correct DOM node and preserve the local state of the correct component instance, such as an input's focus or an expanded row.

Use a unique ID from the data model whenever the list can be inserted into, deleted from, filtered, or sorted. An array index identifies a position, not an item. If the first item is removed, every later index shifts and Vue can reuse a component instance for different data; local state then appears beside the wrong record. Changing an item's key intentionally forces it to be recreated, which can be useful for resetting a component but should not be accidental.

In Vue 3.5.40, keys are especially important for stateful child components and transitions. A static list that never reorders or changes can omit keys, but an index is still a poor default for application data.

# Why It Matters

Incorrect keys create subtle correctness bugs rather than just minor performance costs. Users can see typed input, validation errors, or expanded state transfer to a different row after a reorder.

# Example Code

```typescript
import { defineComponent, h, type PropType } from 'vue';

interface Todo {
  id: string;
  title: string;
}

export const TodoList = defineComponent({
  props: { todos: { type: Array as PropType<Todo[]>, required: true } },
  setup(props) {
    return () => h('ul', props.todos.map((todo) =>
      h('li', { key: todo.id }, todo.title),
    ));
  },
});
```

# Common Mistakes

- **Using the array index for a sortable list:** The index follows the position after sorting, so component-local state follows the old position instead of the todo.
- **Generating a random key on every render:** Vue treats every item as new, destroying and recreating DOM and local component state.
- **Reusing the same key among siblings:** Vue cannot reliably match duplicates, producing warnings and unpredictable updates.

# Follow-up Questions

- **What does changing a component key deliberately do?** (Answer: Vue unmounts the old instance and creates a new one, resetting its local state.)
- **Are keys globally unique?** (Answer: No. They must be unique among siblings in the same rendered list.)

# References

- [Vue documentation: List rendering](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
