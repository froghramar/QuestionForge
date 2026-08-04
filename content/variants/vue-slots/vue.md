---
id: variant.vue-slots.vue
question: question.vue-slots
technology: tech.vue
---
# Expected Answer (Vue.js 3.5.40)

Slots let a child component own layout while its parent supplies content. A default slot represents one content region; named slots make multiple regions explicit, such as `header`, `default`, and `footer`. The child renders those slots where its layout requires them, but the supplied content is evaluated in the parent's scope. That means parent variables are directly available in the slot content, not the child's private variables.

A scoped slot reverses the data direction for selected values: the child passes slot props while rendering the slot, and the parent uses those values to choose presentation. This is useful for reusable components such as tables or lists, where the child owns iteration and accessibility structure but the parent owns the appearance of each record.

Vue 3.5.40 supports slots in templates and render functions. Use slots when callers need to supply arbitrary markup; use regular props when the child only needs configuration or simple data. A slot-heavy API without clear named regions can be harder to discover than a small prop interface.

# Why It Matters

Slots avoid rigid components with too many presentation-specific props. They let a design system provide consistent behavior and structure without preventing product code from controlling content and visual composition.

# Example Code

```typescript
import { defineComponent, h, type PropType, type VNode } from 'vue';

interface Row {
  id: string;
  label: string;
}

export const DataList = defineComponent({
  props: { rows: { type: Array as PropType<Row[]>, required: true } },
  setup(props, { slots }) {
    return (): VNode => h('ul', props.rows.map((row) => h(
      'li',
      { key: row.id },
      slots.default?.({ row }) ?? row.label,
    )));
  },
});
```

# Common Mistakes

- **Expecting slot content to access child-local variables:** Slot content is evaluated in the parent scope; expose child data explicitly through scoped-slot props.
- **Using a slot for a simple boolean or label:** A prop is clearer and easier to type when callers do not need arbitrary markup.
- **Forgetting fallback content:** A reusable component may render an empty region when callers omit an optional slot.

# Follow-up Questions

- **What is a scoped slot?** (Answer: A slot where the child passes data to the parent-provided slot function.)
- **When would you use a named slot?** (Answer: When the component has distinct content areas, such as a modal header, body, and actions.)

# References

- [Vue documentation: Slots](https://vuejs.org/guide/components/slots.html)
