---
id: variant.python-argument-passing.python
question: question.python-argument-passing
technology: tech.python
---
# Expected Answer (Python 3.14)

Python passes references to objects (often described as call-by-object-sharing). The parameter is a local name bound to the same object as the caller's argument. Mutating that object affects what the caller observes, but assigning the parameter to a different object only changes the local binding.

```python
def update(items, count):
    items.append("new")   # Mutates the caller's list.
    count += 1             # Rebinds only the local name.

items = ["old"]
count = 1
update(items, count)

assert items == ["old", "new"]
assert count == 1
```

The same behavior applies to every object type; the visible difference comes from whether an operation mutates an object or creates and binds a replacement object.

# Why It Matters

Unclear mutation contracts cause bugs at API boundaries, especially when a helper silently changes a shared configuration or payload. Understanding the model makes defensive copying and in-place APIs deliberate choices.

# Common Mistakes

- **Calling this ordinary pass-by-reference:** A function cannot rebind the caller's variable through its parameter.
- **Assuming immutable arguments are copied:** They can be shared too; their operations simply produce replacement values.
- **Mutating a supplied list without documenting it:** Callers may reuse that list and observe surprising changes.

# Follow-up Questions

- **How can a function preserve an input list?** (Answer: Return a new list or make a shallow/deep copy as appropriate.)
- **Does `+=` always mutate an object?** (Answer: No; mutable types may implement in-place addition, while immutable types produce a new object.)
