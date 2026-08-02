---
id: variant.singleton-pattern.dotnet
question: question.singleton-pattern
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

A Singleton ensures a class has only one instance. In C#, a thread-safe implementation often uses `Lazy<T>`.

**Why use it?**: To manage shared resources like a Database Connection Pool, a Log Manager, or a global Configuration object.

# Why It Matters

While Singletons provide a global state, they can make unit testing difficult. In modern .NET, we rarely implement the "Classic" Singleton pattern manually. Instead, we register the service with a **Singleton Lifetime** in the DI container.

# Code Example

### Classic Thread-Safe Implementation
```csharp
public sealed class CacheManager
{
    private static readonly Lazy<CacheManager> _instance = 
        new Lazy<CacheManager>(() => new CacheManager());

    public static CacheManager Instance => _instance.Value;

    private CacheManager() { } // Private constructor
}
```

### Modern DI Implementation
```csharp
// In Program.cs
builder.Services.AddSingleton<ICacheManager, CacheManager>();
```

# Common Mistakes

- **Not being thread-safe**: A simple `if (instance == null) instance = new ...` will fail in multi-threaded environments.
- **Hidden Dependencies**: Using `MySingleton.Instance` deep inside business logic makes it hard to see what a class depends on. Use DI instead.

# Follow-up Questions

- **What is Double-Check Locking?** (Answer: An older pattern used before `Lazy<T>` to minimize lock overhead by checking the instance twice).
- **Is a Static Class a Singleton?** (Answer: Similar, but a static class cannot implement interfaces or be passed as a parameter easily).
