---
id: variant.python-imports.python
question: question.python-imports
technology: tech.python
---
# Expected Answer (Python 3.14)

On a normal first import, Python creates a module object, puts it in `sys.modules`, and executes its top-level code. Later imports find that cached module and reuse it, so its top-level code is not normally run again. This is why import-time initialization and mutable module globals have process-wide effects.

The import form affects what local name is bound. `import config` keeps access through the module object, while `from config import timeout` binds the object currently named `timeout` to the importing module's namespace.

```python
# config.py
timeout = 10

# worker.py
import config
from config import timeout

config.timeout = 30
assert config.timeout == 30
assert timeout == 10  # This local name was bound during import.
```

Circular imports fail when one module tries to access a name in another module that is still only partially initialized. Moving shared abstractions to a third module, deferring an import, or redesigning dependencies can resolve the cycle.

# Why It Matters

Understanding imports helps you avoid hidden startup work, stale imported bindings, test-order dependence, and circular-import failures in larger applications.

# Common Mistakes

- **Expecting a second import to rerun initialization:** The existing module object is normally reused from `sys.modules`.
- **Assuming `from module import name` tracks later reassignments:** It binds the object at import time, not a live name lookup.
- **Fixing circular imports only by moving imports randomly:** The durable solution is usually a cleaner dependency direction.

# Follow-up Questions

- **What is `if __name__ == "__main__"` for?** (Answer: It guards code intended to run only when the file is executed as a script.)
- **Can a module be explicitly reloaded?** (Answer: Yes, with `importlib.reload`, but it can leave existing references stale and is rarely a general solution.)
