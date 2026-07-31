---
id: variant.virtual-dom.react
question: question.virtual-dom
technology: tech.react
---
# Expected Answer (React)
When a component's state or props change, React:
1. Creates a new Virtual DOM tree.
2. Compares (diffs) it with the previous Virtual DOM tree.
3. Calculates the minimum number of changes needed.
4. Applies those changes to the real DOM in a single batch.

# Common Mistakes
- Thinking the Virtual DOM is faster than the real DOM in all cases. (It's about *optimizing* updates, not necessarily the baseline speed of a single update).
- Manual DOM manipulation within a React component.

# Follow-up Questions
- What is "React Fiber"?
- Why are "keys" important in lists?
