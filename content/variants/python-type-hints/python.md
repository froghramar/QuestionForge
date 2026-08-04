---
id: variant.python-type-hints.python
question: question.python-type-hints
technology: tech.python
---
# Expected Answer (Python 3.14)

Type hints are optional annotations that document an interface and enable static analysis. Python normally stores annotations but does not use them to reject an invalid argument at runtime. A type checker can flag a mismatch before execution, while a validation library is needed when untrusted runtime data must be checked.

Use precise built-in generic types and unions to communicate the contract. A `Protocol` describes the methods and attributes a value must provide, allowing structural typing without forcing a shared base class.

```python
from typing import Protocol

class HasName(Protocol):
    name: str

def greet(person: HasName, prefix: str = "Hello") -> str:
    return f"{prefix}, {person.name}!"

class User:
    name = "Ada"

assert greet(User()) == "Hello, Ada!"
```

# Why It Matters

Good annotations turn implicit expectations into checkable contracts. They improve editor support, refactoring confidence, and collaboration while retaining Python's runtime flexibility.

# Common Mistakes

- **Expecting annotations to validate runtime input automatically:** Static type checkers do not run as part of normal execution.
- **Using `Any` to silence every error:** It disables useful checking and lets unsound assumptions spread.
- **Using `object` as if it supported arbitrary operations:** Every value is an `object`, but only operations defined on `object` are type-safe without narrowing.

# Follow-up Questions

- **What does `T | None` mean?** (Answer: The value may be a `T` or `None`; it is the modern spelling of `Optional[T]`.)
- **Why use `Protocol` rather than an abstract base class?** (Answer: It supports structural compatibility without requiring explicit inheritance.)
