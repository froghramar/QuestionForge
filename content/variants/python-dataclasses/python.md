---
id: variant.python-dataclasses.python
question: question.python-dataclasses
technology: tech.python
---
# Expected Answer (Python 3.14)

A dataclass is a class decorator for data-oriented classes. From declared fields it can generate an initializer, readable representation, and value equality; options control ordering, immutability-like behavior, slots, and more. It keeps the type explicit while removing repetitive boilerplate.

Mutable fields must use `field(default_factory=...)`, which is called separately for each instance. Writing `tags: list[str] = []` would share a list and is rejected by dataclasses for common mutable built-in defaults.

```python
from dataclasses import dataclass, field

@dataclass(frozen=True, slots=True)
class Issue:
    number: int
    title: str
    labels: list[str] = field(default_factory=list)

issue = Issue(42, "Add type hints")
issue.labels.append("good-first-issue")
assert issue.labels == ["good-first-issue"]
```

`frozen=True` prevents attribute reassignment, but it does not recursively freeze a mutable field such as the list above.

# Why It Matters

Dataclasses make domain models and internal transfer objects concise and readable. Understanding their generated behavior prevents shared defaults and incorrect assumptions about immutability or input validation.

# Common Mistakes

- **Using a mutable literal as a field default:** Use `default_factory` to create one object per instance.
- **Assuming `frozen=True` deeply freezes nested values:** It blocks assigning attributes, not mutation inside a contained list or dictionary.
- **Treating a dataclass as automatic validation:** Type annotations and generated initialization do not validate untrusted input by themselves.

# Follow-up Questions

- **Why use `slots=True`?** (Answer: It can reduce per-instance memory and prevents arbitrary instance attributes unless explicitly supported.)
- **How can a dataclass run post-initialization logic?** (Answer: Implement `__post_init__`.)
