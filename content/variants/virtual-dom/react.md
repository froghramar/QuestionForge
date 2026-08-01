---
id: variant.virtual-dom.react
question: question.virtual-dom
technology: tech.react
---
# Expected Answer

The **Virtual DOM (VDOM)** is a lightweight, in-memory representation of the real DOM. When a component's state changes, React creates a new VDOM tree and compares it to the previous one in a process called **Reconciliation** (or "Diffing"). It then computes the minimum set of changes needed and applies them to the real DOM in a single batch.

The **Diffing Algorithm** is optimized for performance by assuming that different element types will produce different trees and using **keys** to track elements across renders.

# Why It Matters

Direct DOM manipulation is expensive because it triggers browser layout and paint cycles. The VDOM allows React to **batch updates**, preventing "layout thrashing" and ensuring that the UI stays in sync with the application state without the developer having to manually track which parts of the page need to change. It enables a declarative programming model: you describe *what* the UI should look like, and React handles *how* to update the browser.

# Example Code

### The Reconciliation Process

```jsx
// Render 1:
<ul>
  <li key="a">Apple</li>
  <li key="b">Banana</li>
</ul>

// Render 2:
<ul>
  <li key="c">Cherry</li>
  <li key="a">Apple</li>
  <li key="b">Banana</li>
</ul>

// Result: React sees the keys and knows it only needs to 
// INSERT one <li> instead of rebuilding the entire list.
```

# Common Mistakes

- **Thinking VDOM is always faster**: The VDOM is an abstraction that adds its own overhead. For extremely simple updates, direct DOM manipulation is faster. The VDOM wins by optimizing complex, multi-component updates.
- **Using Array Index as Key**: When items are reordered, using the index as a key causes React to mismatch component instances with their state, leading to subtle bugs in forms and animations.
- **Directly Mutating the DOM**: Using `document.getElementById` to change a React-managed element. This causes the VDOM and Real DOM to desync, which React will likely overwrite on the next render.

# Follow-up Questions

- **What is React Fiber?** (Answer: The current reconciliation engine that allows React to split the rendering work into small chunks and prioritize urgent updates like user input).
- **Why are keys necessary in React?** (Answer: Keys provide a stable identity for elements, allowing React to match them across renders even if they move positions in a list).

# References

- [React Docs: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React Implementation Notes: Reconciliation](https://legacy.reactjs.org/docs/reconciliation.html)
