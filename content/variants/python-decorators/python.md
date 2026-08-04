---
id: variant.python-decorators.python
question: question.python-decorators
technology: tech.python
---
# Expected Answer (Python 3.14)

A decorator is a callable that takes a function or class and returns a replacement. In `@log_calls` syntax, Python evaluates it like `process = log_calls(process)`. A function decorator usually returns a wrapper that performs work before or after calling the original function.

```python
from functools import wraps

def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def greet(name):
    "Return a greeting."
    return f"Hello, {name}!"

assert greet("Ada") == "Hello, Ada!"
assert greet.__name__ == "greet"
```

`functools.wraps` copies metadata and exposes `__wrapped__`, which helps introspection, documentation tools, debuggers, and frameworks that inspect function signatures.

# Why It Matters

Decorators are widely used for cross-cutting behavior such as logging, authorization, retries, validation, caching, and route registration. Understanding their mechanics helps you debug framework code and avoid wrappers that break tooling.

# Common Mistakes

- **Omitting `@wraps(func)`:** The wrapper hides the original function's name, docstring, and other metadata.
- **Forgetting to return the wrapped function's result:** The decorated function unexpectedly returns `None`.
- **Using a fixed wrapper signature:** A wrapper that does not accept `*args, **kwargs` fails for valid calls to the wrapped function.

# Follow-up Questions

- **How does a parameterized decorator work?** (Answer: An outer function receives configuration and returns the actual decorator.)
- **In what order are stacked decorators applied?** (Answer: Bottom-up; `@a` above `@b` becomes `a(b(function))`.)
