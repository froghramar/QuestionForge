---
id: variant.python-mutable-default-arguments.python
question: question.python-mutable-default-arguments
technology: tech.python
---
# Expected Answer (Python 3.14)

Python evaluates default values when the function is defined, not each time it is called. A list, dictionary, or set used as a default is therefore one shared object. Mutating it in one call changes what later calls observe.

Use `None` as the default and construct the list inside the function.

```python
def add_tag(tag, tags=None):
    if tags is None:
        tags = []
    tags.append(tag)
    return tags

assert add_tag("python") == ["python"]
assert add_tag("testing") == ["testing"]
```

# Why It Matters

This bug can cause requests, users, or test cases to leak state into one another. The failure is especially confusing because it depends on call history and may not appear in isolated tests.

# Common Mistakes

- **Using `[]` or `{}` as an optional parameter default:** The container is shared by calls that omit it.
- **Writing `if not tags:` instead of `if tags is None:` An intentionally supplied empty list is valid and should not be replaced.
- **Assuming every default is unsafe:** Immutable defaults such as strings, tuples containing immutable values, and integers cannot be mutated in place.

# Follow-up Questions

- **When is the default expression evaluated?** (Answer: Once, when the function definition executes.)
- **Does a tuple default always avoid shared-state issues?** (Answer: Only when its contents are immutable; it may contain mutable objects.)
