---
id: variant.python-scope.python
question: question.python-scope
technology: tech.python
---
# Expected Answer (Python 3.14)

Python resolves a bare name in LEGB order: local, enclosing function scopes, global module scope, and built-ins. An assignment inside a function creates a local name by default. Use `nonlocal` to rebind a name from an enclosing function and `global` to rebind a module-level name, although passing state explicitly is often clearer.

Closures capture bindings, not a snapshot of a loop variable's value. Bind the value through a default argument or a helper function when each callback needs its own value.

```python
def make_counters():
    total = 0

    def increment():
        nonlocal total
        total += 1
        return total

    return increment

counter = make_counters()
assert counter() == 1
assert counter() == 2

callbacks = [lambda item=item: item for item in range(3)]
assert [callback() for callback in callbacks] == [0, 1, 2]
```

# Why It Matters

Correct scope handling prevents callbacks with surprising values and state updates that silently affect the wrong variable. It also makes closures and decorators easier to debug and test.

# Common Mistakes

- **Assigning to an outer name without `nonlocal`:** Python treats it as a new local and can raise `UnboundLocalError` when it is read first.
- **Using `global` as a shortcut for shared state:** It makes dependencies harder to test and reason about.
- **Expecting a closure to snapshot a changing loop variable:** It looks up the enclosing binding when called unless a value is bound explicitly.

# Follow-up Questions

- **What scope does a comprehension variable have in Python 3?** (Answer: It is local to the comprehension and does not leak into the surrounding scope.)
- **How can a closure retain one loop value?** (Answer: Bind it in a default parameter or pass it to a function that creates the closure.)
