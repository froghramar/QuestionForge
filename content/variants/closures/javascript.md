---
id: variant.closures.javascript
question: question.closures
technology: tech.javascript
---
# Expected Answer

A **closure** is a function that retains access to variables from its enclosing lexical scope, even after that outer function has returned. In JavaScript, closures are created every time a function is defined. It is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).

# Why It Matters

Closures are fundamental to the JavaScript language. They enable powerful patterns like **data privacy** (encapsulation), **partial application** (currying), and maintaining state in asynchronous callbacks or event handlers. Without closures, we couldn't have private variables in functional programming or effectively handle state in React hooks like `useState`.

# Example Code

### Data Privacy (Module Pattern)

```javascript
function createCounter() {
  let count = 0;  // This variable is "closed over" and private
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2 — `count` persists
console.log(counter.count);       // undefined (private!)
```

### The Classic Loop Pitfall

```javascript
// Bug: all callbacks log 3 because `var i` is function-scoped
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
} // Logs: 3, 3, 3

// Fix: `let` creates a new binding per iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
} // Logs: 0, 1, 2
```

# Common Mistakes

- **Closure over `var` in loops**: Each iteration shares the same `var` binding, so all closures see the final value. Using `let` or an IIFE fixes it.
- **Memory leaks**: Closures hold references to their entire enclosing scope. If a closure references a large object, it can't be garbage collected as long as the closure exists.
- **Accidental stale closures in React**: Using a value inside a `useEffect` callback that was captured at render time but has since changed.

# Follow-up Questions

- **How does the garbage collector handle variables captured by closures?** (Answer: The GC cannot collect any variable referenced by an active closure. If the closure is stored in a long-lived structure like an event listener, the closed-over variables persist).
- **What is the difference between a closure and an IIFE?** (Answer: An IIFE is a function that executes immediately and can create a closure. IIFEs are a pattern for creating isolated scopes; closures are a language mechanism).

# References

- [MDN Web Docs: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript.info: Variable scope, closure](https://javascript.info/closure)
