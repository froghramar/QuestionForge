---
id: variant.dotnet-disposal.python
question: question.dotnet-disposal
technology: tech.python
---
# Expected Answer (Python 3.14)

A context manager encapsulates setup and cleanup around a `with` block. Python calls `__enter__()` before the block and `__exit__(exc_type, exc, traceback)` when it leaves, including when an exception is raised. Returning a truthy value from `__exit__` suppresses that exception, so this should be done deliberately.

```python
class Transaction:
    def __enter__(self):
        print("begin")
        return self

    def __exit__(self, exc_type, exc, traceback):
        if exc_type is None:
            print("commit")
        else:
            print("rollback")
        return False  # Propagate any exception.

with Transaction():
    pass
```

The same pattern safely handles files, database transactions, locks, and temporary resources. It is often clearer and safer than relying on callers to remember a later cleanup call.

# Why It Matters

Reliable cleanup prevents resource leaks, locked files, unreturned database connections, and locks left held after an error. The `with` form makes the resource lifetime obvious in code review.

# Common Mistakes

- **Calling `close()` only on the happy path:** An exception before that call can leak the resource.
- **Returning `True` from `__exit__` unintentionally:** This swallows an exception and can conceal a failure.
- **Confusing `__enter__`'s return value with the manager:** The value returned by `__enter__` is what `as value` receives.

# Follow-up Questions

- **How do you compose multiple resources?** (Answer: Put multiple managers in one `with` statement or nest the blocks.)
- **What does `contextlib.contextmanager` require?** (Answer: A generator with one `yield` separating setup from cleanup.)
