---
id: variant.dependency-injection.dotnet
question: question.dependency-injection
technology: tech.dotnet
---
# Expected Answer (.NET)
ASP.NET Core provides a native DI container. The three service lifetimes are:
1. **Transient:** Created every time they are requested.
2. **Scoped:** Created once per client request (within a scope).
3. **Singleton:** Created once the first time they are requested.

# Common Mistakes
- Injecting a Scoped service into a Singleton.
- Manual instantiation of classes that should be managed by the DI container.

# Follow-up Questions
- What is the `IServiceCollection`?
- How do you resolve a service manually using `IServiceProvider`?
