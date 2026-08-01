---
id: variant.virtual-dom.react
question: question.virtual-dom
technology: tech.react
---
# Expected Answer

React maintains a lightweight in-memory representation of the UI called the **Virtual DOM**. When state or props change, React builds a new VDOM tree, compares it with the previous one, and applies only the necessary changes to the real DOM.

### The Reconciliation Process

1. **Trigger**: A component's state or props change, scheduling a re-render.
2. **Render phase**: React calls the component's render function to produce a new VDOM tree (a tree of React elements — plain JavaScript objects).
3. **Diffing**: React compares the new tree with the previous tree using its O(n) heuristic algorithm:
   - **Different element types** (e.g., `<div>` → `<span>`): Tear down the old subtree entirely and build a new one.
   - **Same element type**: Compare attributes/props, update only what changed, and recurse into children.
   - **Lists**: Use `key` props to match children between renders, enabling efficient reordering without unnecessary unmount/remount.
4. **Commit phase**: React applies the computed changes to the real DOM in a single batch.

### Why Not Direct DOM Manipulation?

The Virtual DOM isn't faster than direct DOM updates for a single change. Its value is **batching and minimizing** DOM operations. When 10 state updates happen in one event handler, React computes one diff and applies one batch of DOM mutations instead of 10 separate ones.

### React Fiber

React Fiber (React 16+) is the reimplemented reconciliation engine that enables:
- **Interruptible rendering**: Long renders can be paused to handle urgent updates (e.g., user input).
- **Priority scheduling**: Updates are assigned priorities — `startTransition` marks non-urgent updates.
- **Concurrent features**: Suspense, streaming SSR, and selective hydration.

# Common Mistakes

- **Believing the VDOM is always faster than the real DOM**: It's an optimization for update batching, not a universal performance improvement. For a single, simple change, direct DOM manipulation is faster.
- **Missing or unstable keys in lists**: Using array index as a key breaks reconciliation when items are reordered, inserted, or deleted — React can't distinguish which items changed.
- **Direct DOM manipulation inside React components**: Using `document.getElementById()` or jQuery alongside React causes the VDOM and real DOM to desync, leading to unpredictable behavior.

# Follow-up Questions

- What is React Fiber and how does it differ from the original stack reconciler? (Answer: The stack reconciler processed the tree synchronously and couldn't be interrupted. Fiber uses a linked-list structure that can pause, resume, and prioritize work units).
- Why are keys important in lists, and why is using the array index as a key problematic? (Answer: Keys let React identify which items have changed. Index-as-key fails when items are reordered because the key doesn't correspond to the actual data — React reuses the wrong component instances, losing state).
