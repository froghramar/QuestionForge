---
id: variant.react-key-prop.react
question: question.react-key-prop
technology: tech.react
---
# Expected Answer

The `key` prop is a special string attribute you need to include when creating lists of elements in React. Keys help React identify which items have changed, are added, or are removed.

During the **reconciliation** process, React compares the new tree of elements with the previous one. Without keys, React can only match items based on their index in the array. With keys, React can:
1.  **Preserve Component State:** If an item moves but keeps the same key, React knows it's the same instance and preserves its local state.
2.  **Optimize Performance:** Instead of re-rendering everything, React can reorder elements in the DOM.
3.  **Identify Changes Correctily:** It prevents bugs where data from one list item is "leaked" into another after a deletion or reorder.

# Why It Matters

Using keys correctly is critical for both performance and correctness. If you use unstable keys (like `Math.random()`), React will destroy and recreate every component in the list on every render, leading to poor performance and loss of input focus. If you use indices as keys for lists that can change (sort, filter, add), you will encounter subtle bugs where state (like a checkbox being checked) stays with the index rather than the data.

# Example Code

### Correct: Using Stable IDs

```jsx
const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.text}</li>
    ))}
  </ul>
);
```

### Problematic: Using Index as Key

If `todos` are reordered, the component at index 0 remains the same component instance, but gets new data, which can cause state bugs.

```jsx
{todos.map((todo, index) => (
  <li key={index}>{todo.text}</li>
))}
```

# Common Mistakes

- **Using `Math.random()` as a key:** This causes a full unmount/remount on every render.
- **Using index as a key for dynamic lists:** Only safe if the list is static (never filtered, sorted, or items added/removed).
- **Duplicate keys:** React will log a warning, and the behavior becomes unpredictable as React might "mix up" the components.
- **Defining keys on the wrong element:** The key must be on the element returned *directly* inside the `map` callback, not on a child deep within that element.

# Follow-up Questions

- **What happens if you don't provide a key?** (Answer: React defaults to using the index and issues a warning in the console).
- **When is it actually safe to use the index as a key?** (Answer: When the list and items are static, have no IDs, and the list is never reordered or filtered).
- **How does React's diffing algorithm handle keys?** (Answer: It uses the key to "match" elements between the old and new tree, enabling efficient reordering instead of full replacements).

# References

- [React Docs: Lists and Keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys)
- [Robin Pokorny: Index as a key is an anti-pattern](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)
