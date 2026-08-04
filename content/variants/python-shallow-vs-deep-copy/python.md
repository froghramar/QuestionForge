---
id: variant.python-shallow-vs-deep-copy.python
question: question.python-shallow-vs-deep-copy
technology: tech.python
---
# Expected Answer (Python 3.14)

Assignment does not copy an object: it binds another name to it. A shallow copy makes a new outer container but retains references to nested values. A deep copy recursively copies nested objects, which prevents nested mutation from being shared but can be expensive or inappropriate for resources and identity-sensitive objects.

```python
from copy import copy, deepcopy

original = [["draft"], ["published"]]
shallow = copy(original)
deep = deepcopy(original)

shallow[0].append("review")
assert original[0] == ["draft", "review"]  # Inner list is shared.

deep[1].append("archived")
assert original[1] == ["published"]
```

For simple containers, slicing a list, `list(value)`, `dict.copy()`, or `{**mapping}` are shallow-copy operations. The appropriate choice depends on which parts of the data may be mutated later.

# Why It Matters

Unexpected aliasing can corrupt supposedly independent request payloads, test fixtures, and configuration objects. Conversely, unnecessary deep copies waste time and memory and may mishandle open connections, locks, or custom objects.

# Common Mistakes

- **Assuming `=` creates a copy:** Both names refer to one object.
- **Assuming a list slice copies nested lists:** It only copies the outer list.
- **Using `deepcopy` blindly:** It can be slow and is unsuitable as a universal solution for resource-owning objects.

# Follow-up Questions

- **How can an object customize copying?** (Answer: Define `__copy__` or `__deepcopy__`.)
- **Why are immutable values usually safe to share?** (Answer: They cannot be changed in place.)
