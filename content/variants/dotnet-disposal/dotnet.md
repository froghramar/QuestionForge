---
id: variant.dotnet-disposal.dotnet
question: question.dotnet-disposal
technology: tech.dotnet
---
# Expected Answer
In .NET, the Garbage Collector (GC) only manages **managed memory**. It does not know how to clean up **unmanaged resources** like file handles, database connections, or network sockets. `IDisposable` provides a standard mechanism for deterministic cleanup.

### The Dispose Method
Calling `Dispose()` explicitly tells the object to release its unmanaged resources immediately, rather than waiting for an indeterminate time for the GC to run.

### The Full Pattern
A robust implementation should handle:
1. **Redundant calls:** Safe to call multiple times.
2. **Managed vs Unmanaged:** Only clean up managed objects if called from `Dispose()`.
3. **Finalizers:** If the user forgets to call Dispose, the Finalizer (`~ClassName`) should eventually clean up the unmanaged resources.

### `GC.SuppressFinalize(this)`
This is a crucial performance optimization. If `Dispose()` is called, the object is already clean. Telling the GC to skip the Finalization queue prevents the object from being promoted to a higher generation, allowing it to be collected sooner.

# Common Mistakes
- **Accessing Disposed Objects:** Not checking a `_disposed` flag in methods after cleanup.
- **Forgetting `GC.SuppressFinalize`:** Causing objects to live longer than necessary in the GC generations.
- **Cleaning Managed Objects in a Finalizer:** You cannot guarantee the state of other managed objects during finalization.

# Follow-up Questions
- What is the difference between a `using` statement and a `using` declaration?
- When would you implement a Finalizer without `IDisposable`? (Answer: Almost never).
