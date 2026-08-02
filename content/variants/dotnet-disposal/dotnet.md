---
id: variant.dotnet-disposal.dotnet
question: question.dotnet-disposal
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

In .NET, the Garbage Collector (GC) manages **managed memory**, but it does not know how to clean up **unmanaged resources** (e.g., file handles, database connections, network sockets). The `IDisposable` interface provides a standard mechanism to release these resources deterministically.

A robust implementation should follow the **Dispose Pattern**, which handles both explicit cleanup via `Dispose()` and implicit cleanup via the Finalizer (`~ClassName`) if the developer forgets to call `Dispose`.

# Why It Matters

Failure to dispose of objects correctly leads to **Resource Leaks**. For example, failing to close database connections will eventually exhaust the connection pool, causing the application to crash. While the GC will eventually run the Finalizer, this is non-deterministic and can happen much later than needed, keeping expensive resources locked unnecessarily.

# Example Code

```csharp
public class ResourceHolder : IDisposable
{
    private bool _disposed = false;
    private SafeHandle _handle = new SafeFileHandle(IntPtr.Zero, true);

    public void Dispose()
    {
        Dispose(true);
        // Optimization: Tell GC the object is clean, skip finalization
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;

        if (disposing)
        {
            // Clean up managed resources here
            _handle?.Dispose();
        }

        // Clean up unmanaged resources here (if any)
        
        _disposed = true;
    }

    ~ResourceHolder() => Dispose(false);
}
```

# Common Mistakes

- **Forgetting `GC.SuppressFinalize(this)`**: This causes the object to be promoted to a higher GC generation because it must wait for the Finalizer queue to be processed, even though it's already clean.
- **Accessing Disposed Objects**: Failing to check a `_disposed` flag in public methods, which can lead to `ObjectDisposedException`.
- **Cleaning Managed Objects in a Finalizer**: The Finalizer should **only** touch unmanaged resources because the state of other managed objects is non-deterministic during finalization.

# Follow-up Questions

- **What is the difference between `using` statements and `using` declarations?** (Answer: A `using` statement defines a specific block of scope; a `using` declaration (C# 8.0+) disposes the variable at the end of the enclosing block).
- **When is a Finalizer actually required?** (Answer: Only when your class directly owns an unmanaged resource, like an `IntPtr` from a Win32 API call. If you only own other `IDisposable` objects, you don't need a finalizer).

# References

- [Microsoft Learn: Implement a Dispose method](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose)
- [Stephen Cleary: IDiposable and Finalizers](https://blog.stephencleary.com/2009/08/how-to-implement-idisposable-and.html)
