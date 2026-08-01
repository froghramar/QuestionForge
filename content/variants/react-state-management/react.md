---
id: variant.react-state-management.react
question: question.react-state-management
technology: tech.react
---
# Expected Answer

### Context API
- **Purpose:** Designed for "Static" or low-frequency data (e.g., Theme, Locale, Auth User).
- **Behavior:** When a Context Provider's value changes, **all** components that consume that context are re-rendered.
- **Pros:** Zero dependencies; built-in; perfect for dependency injection.
- **Cons:** Performance bottleneck for high-frequency updates (e.g., a stock price ticker or a form input).

### State Libraries (Zustand, Redux)
- **Purpose:** Designed for high-frequency, complex, or global state.
- **Behavior:** Use "selectors" to ensure that a component only re-renders if the *specific* slice of state it cares about changes.
- **Pros:** Performance optimizations out of the box; devtools; middle-ware support.
- **Cons:** External dependency; boilerplate (in the case of Redux).

### The "Selector" Difference
The biggest technical difference is that Context does not support selectors natively. If you have 100 components using `useContext(MyContext)`, and you update one property in that context, all 100 will re-render. Libraries like Zustand use a subscription model to avoid this.

# Common Mistakes
- **Prop Drilling Fix:** Using Context to avoid prop drilling for data that isn't actually "global".
- **Context for Everything:** Putting your entire app state in one giant Context Provider.

# Follow-up Questions
- How can you optimize Context performance? (Answer: Splitting contexts or memoizing children).
- Why is Zustand generally preferred over Redux in modern React? (Answer: Minimal boilerplate and simpler API).
