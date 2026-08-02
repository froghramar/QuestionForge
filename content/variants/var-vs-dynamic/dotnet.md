---
id: variant.var-vs-dynamic.dotnet
question: question.var-vs-dynamic
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

Both `var` and `dynamic` allow for flexible variable declaration, but they behave differently:

1. **`var` (Type Inference)**:
   - The type is determined by the compiler at compile-time based on the initialization.
   - Once assigned, the type is fixed and cannot change.
   - It is just syntactic sugar; the resulting IL code is identical to using the explicit type.
2. **`dynamic` (Late Binding)**:
   - The type is resolved at runtime.
   - You can assign any value to it, and change it later.
   - The compiler skips type checking; if you call a method that doesn't exist, it throws a `RuntimeBinderException`.

# Why It Matters

Use `var` whenever the type is obvious from the right-hand side of the assignment (e.g., `var list = new List<string>()`) to keep code clean. Use `dynamic` sparingly, typically for COM Interop, Reflection, or when handling dynamic JSON objects without a fixed schema.

# Code Example

```csharp
// var: Static typing
var name = "John"; 
// name = 123; // Compile Error!

// dynamic: Dynamic typing
dynamic anything = "Hello";
anything = 123; // Works!
anything.NonExistentMethod(); // Compiles, but crashes at RUNTIME
```

# Common Mistakes

- **Using `dynamic` for performance**: `dynamic` is slower because it involves runtime overhead (DLR - Dynamic Language Runtime).
- **Using `var` when type isn't clear**: `var x = GetResult();` can be hard to read if `GetResult()` isn't clearly named.

# Follow-up Questions

- **Does `var` affect performance?** (Answer: No, it is resolved at compile-time).
- **Is `object` the same as `dynamic`?** (Answer: No. `object` requires casting to access members; `dynamic` does not, as it assumes the members will be there at runtime).
