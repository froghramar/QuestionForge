---
id: variant.closures.javascript
question: question.closures
technology: tech.javascript
---
# Expected Answer
A closure gives you access to an outer function's scope from an inner function.
Practical uses:
- Data privacy (emulating private methods).
- Partial application and Currying.
- Event handlers and callbacks that maintain state.

# Common Mistakes
- Creating closures in loops without using `let` (the classic `var` issue).
- Memory leaks if closures are not managed correctly.

# Follow-up Questions
- How does the garbage collector handle closures?
