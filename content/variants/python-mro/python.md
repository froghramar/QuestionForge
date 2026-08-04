---
id: variant.python-mro.python
question: question.python-mro
technology: tech.python
---
# Expected Answer (Python 3.14)

The method resolution order is the ordered list of classes Python searches for an attribute. You can inspect it with `Class.mro()` or `Class.__mro__`. In multiple inheritance, Python uses C3 linearization to preserve local base-class order while producing a consistent order across the hierarchy.

`super()` means "the next implementation in the MRO," not simply "my direct parent." That is why cooperative classes should use `super()` rather than directly naming a base class.

```python
class Root:
    def describe(self):
        return ["root"]

class Left(Root):
    def describe(self):
        return ["left", *super().describe()]

class Right(Root):
    def describe(self):
        return ["right", *super().describe()]

class Child(Left, Right):
    pass

assert Child.mro()[:4] == [Child, Left, Right, Root]
assert Child().describe() == ["left", "right", "root"]
```

# Why It Matters

Many frameworks use mixins and base classes for shared behavior. Understanding MRO prevents duplicated initialization, skipped validation, and surprising overrides when composing those components.

# Common Mistakes

- **Treating `super()` as a direct-parent call:** It advances through the MRO and may reach a sibling class first.
- **Directly calling a base method in a cooperative hierarchy:** This can bypass another class in the MRO or invoke shared behavior more than once.
- **Mixing `super()` and direct calls indiscriminately:** All participants need a consistent cooperative design.

# Follow-up Questions

- **How do you see the MRO for a class?** (Answer: Call `Class.mro()` or inspect `Class.__mro__`.)
- **What happens if Python cannot construct a consistent MRO?** (Answer: Class creation raises `TypeError`.)
