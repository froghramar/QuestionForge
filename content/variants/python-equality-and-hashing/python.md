---
id: variant.python-equality-and-hashing.python
question: question.python-equality-and-hashing
technology: tech.python
---
# Expected Answer (Python 3.14)

`is` checks whether two references point to the very same object. `==` checks value equality, usually by calling `__eq__`. Dictionaries and sets rely on `__hash__` and `__eq__`: equal objects must produce the same hash, although different objects may legitimately have hash collisions.

If a class defines value equality but not a compatible hash, its instances should generally be unhashable. This protects against putting an object in a set and then mutating a value that determines where it belongs.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Coordinate:
    x: int
    y: int

first = Coordinate(3, 4)
second = Coordinate(3, 4)

assert first == second
assert first is not second
assert {first} == {second}
```

# Why It Matters

The contract governs cache keys, deduplication, set membership, and dictionary lookups. A bad implementation can make a key impossible to find or allow logically duplicate values into a set.

# Common Mistakes

- **Using `is` to compare ordinary values:** Identity is not a reliable value comparison; reserve it for singletons such as `None`.
- **Making mutable fields part of a hash:** Mutation after insertion can invalidate collection lookup behavior.
- **Assuming unequal objects need different hashes:** Collisions are allowed; equal objects sharing a hash is the required rule.

# Follow-up Questions

- **Why is `None` normally checked with `is`?** (Answer: It is a singleton, so identity clearly expresses the sentinel check.)
- **What happens when `__eq__` is defined without a compatible `__hash__`?** (Answer: Instances are normally made unhashable to avoid breaking the contract.)
