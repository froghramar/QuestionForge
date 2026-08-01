---
id: variant.closures.javascript
question: question.closures
technology: tech.javascript
---
# Expected Answer

A **closure** is a function that retains access to variables from its enclosing lexical scope, even after that outer function has returned. In JavaScript, closures are created every time a function is defined.

### Basic Example

```javascript
function createCounter() {
  let count = 0;  // This variable is "closed over"
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
counter.getCount(); // 2 — `count` persists because the closure holds a reference
```

### Practical Uses

1. **Data privacy / Module pattern**: Emulating private variables that can't be accessed directly from outside.
2. **Partial application / Currying**:
   ```javascript
   const multiply = (a) => (b) => a * b;
   const double = multiply(2);
   double(5); // 10
   ```
3. **Event handler factories**: Creating handlers that remember configuration without globals.
4. **Memoization**: Caching expensive computation results in the closure's scope.

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

- **Closure over `var` in loops**: The classic bug above. Each iteration shares the same `var` binding, so all closures see the final value. Using `let` or an IIFE fixes it.
- **Memory leaks**: Closures hold references to their entire enclosing scope. If a closure references a large object (e.g., a DOM node), it can't be garbage collected as long as the closure exists. This is especially problematic in long-lived event listeners.
- **Accidental stale closures in React**: Using a value inside a `useEffect` callback that was captured at render time but has since changed. This is why the dependency array exists.

# Follow-up Questions

- How does the garbage collector handle variables captured by closures? (Answer: The GC cannot collect any variable referenced by an active closure. If the closure is stored in a long-lived structure like an event listener, the closed-over variables persist for the lifetime of that listener).
- What is the difference between a closure and an IIFE? (Answer: An IIFE is a function that executes immediately and can create a closure, but not all closures are IIFEs. IIFEs are a pattern for creating isolated scopes; closures are a language mechanism).
