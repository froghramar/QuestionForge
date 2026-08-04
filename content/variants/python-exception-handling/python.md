---
id: variant.python-exception-handling.python
question: question.python-exception-handling
technology: tech.python
---
# Expected Answer (Python 3.14)

Handle only exceptions you expect and can recover from. Keep the `try` block small so that an `except` clause does not accidentally catch unrelated programming errors. Use `else` for work that depends on success, and use `finally` for cleanup that must run whether the operation succeeds or fails.

When translating a low-level failure into a domain-specific one, chain the original exception with `raise ... from ...` so logs and debuggers retain the cause.

```python
class ConfigurationError(Exception):
    pass

def load_port(value):
    try:
        return int(value)
    except ValueError as error:
        raise ConfigurationError("PORT must be an integer") from error

try:
    port = load_port("not-a-number")
except ConfigurationError as error:
    print(error)
```

# Why It Matters

Broad exception handling can turn real defects into silent bad results, while unhandled operational errors can make a service unreliable. Chaining and targeted handling make failures diagnosable without exposing implementation details to callers.

# Common Mistakes

- **Using a bare `except:` clause:** It also catches control-flow exceptions such as `KeyboardInterrupt` and `SystemExit`.
- **Catching `Exception` and continuing silently:** This hides bugs unless the failure is logged or returned in a meaningful way.
- **Raising a replacement exception without `from`:** The original cause is lost from the traceback.

# Follow-up Questions

- **When does `finally` run?** (Answer: When the `try` statement exits, whether by success, exception, or return.)
- **Why place as little code as possible in `try`?** (Answer: It limits the operations that an `except` might mistakenly handle.)
