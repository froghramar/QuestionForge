---
id: variant.react-state-management.react
question: question.react-state-management
technology: tech.react
---
# Expected Answer

The choice between **Context API** and a **Global State Library** (like Zustand or Redux) depends on the frequency of updates and the complexity of the data:

- **Context API**: Best for "static" or low-frequency data (Themes, User Auth, Locale). It is built-in but lacks a "selector" mechanism, meaning every component consuming the context re-renders whenever any part of the context value changes.
- **State Libraries**: Best for high-frequency or complex global state. They use a subscription/selector model to ensure that a component only re-renders when the specific slice of data it cares about changes.

# Why It Matters

Using Context API for high-frequency state (like an input field or a real-time price ticker) can lead to **performance bottlenecks**. Since Context triggers re-renders for all consumers, a single keystroke in a large application could trigger hundreds of unnecessary renders, making the UI feel sluggish. Libraries like Zustand solve this by decoupling state updates from the React render tree.

# Example Code

### Context API (Triggers re-render for all consumers)

```jsx
const UserContext = createContext();

function Profile() {
  const { name } = useContext(UserContext); // Re-renders if name OR email changes
  return <div>{name}</div>;
}
```

### Zustand (Selector-based, efficient)

```javascript
const useStore = create((set) => ({
  name: "Frog",
  email: "frog@example.com",
}));

function Profile() {
  const name = useStore(state => state.name); // ONLY re-renders if name changes
  return <div>{name}</div>;
}
```

# Common Mistakes

- **Using Context for "Prop Drilling" only**: Context is a dependency injection tool, not just a way to avoid passing props. If the data is only used by a small sub-tree, consider passing props or using component composition instead.
- **One Giant Context**: Putting the entire application state into a single Context Provider. This guarantees that a change to one tiny piece of state will re-render the entire application.

# Follow-up Questions

- **How can you optimize Context performance without a library?** (Answer: Split one large context into several smaller, focused contexts; or wrap child components in `React.memo`).
- **Why is Zustand often preferred over Redux?** (Answer: Less boilerplate, no need to wrap the app in a Provider, and a simpler hook-based API).

# References

- [React Docs: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
