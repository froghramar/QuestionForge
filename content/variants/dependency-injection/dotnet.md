---
id: variant.dependency-injection.dotnet
question: question.dependency-injection
technology: tech.dotnet
---
# Expected Answer

ASP.NET Core provides a built-in dependency injection (DI) container that manages the lifetime and resolution of services. The three primary service lifetimes are:

1.  **Transient**: Services are created every time they are requested from the service container. This lifetime works best for lightweight, stateless services.
2.  **Scoped**: Services are created once per client request (connection). All components processing the same web request share the same instance.
3.  **Singleton**: Services are created the first time they are requested (or when `Startup` runs) and every subsequent request uses the same instance.

# Why It Matters

Proper DI management is crucial for **loose coupling** and **testability**. It allows you to swap implementations (e.g., using a Mock repository in tests) without changing the consuming class. Misunderstanding lifetimes—especially "Captive Dependencies" (injecting a Scoped service into a Singleton)—can lead to memory leaks, stale data, and concurrency bugs.

# Example Code

```csharp
// Registration in Program.cs
builder.Services.AddTransient<IMyTransientService, MyTransientService>();
builder.Services.AddScoped<IMyScopedService, MyScopedService>();
builder.Services.AddSingleton<IMySingletonService, MySingletonService>();

// Usage in a Controller
public class MyController : ControllerBase
{
    private readonly IMyScopedService _scopedService;

    public MyController(IMyScopedService scopedService)
    {
        _scopedService = scopedService;
    }
}
```

# Common Mistakes

- **Captive Dependency**: Injecting a Scoped service into a Singleton. The Scoped service will effectively become a Singleton, which might break its intended behavior (e.g., sharing a database context across multiple requests).
- **Service Locator Anti-pattern**: Manually resolving services from `IServiceProvider` inside your business logic instead of using constructor injection. This makes the code harder to test and hides dependencies.

# Follow-up Questions

- **How do you resolve a service manually when constructor injection isn't available?** (Answer: Use `IServiceScopeFactory` to create a new scope and then resolve the service from the scope's `IServiceProvider`).
- **What is the difference between `AddSingleton<TService, TImplementation>()` and `AddSingleton(new TImplementation())`?** (Answer: The first is lazily created on first request; the second is eagerly created during registration).

# References

- [Microsoft Learn: Dependency injection in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection)
