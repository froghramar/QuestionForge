---
id: variant.sealed-classes.dotnet
question: question.sealed-classes
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

In C#, the `sealed` modifier prevents a class from being inherited. 

- **Usage**: You apply it to the class definition: `public sealed class MyClass { }`.
- **When to use it**:
    - **Performance**: The JIT compiler can optimize calls to virtual members (Devirtualization) because it knows no overrides exist.
    - **Security**: Prevents others from altering the behavior of your class by inheriting and overriding methods.
    - **Design Intent**: When a class is designed as a "leaf" class and isn't intended to be a base for others.
    - **Records**: Records are often sealed to ensure value-based equality isn't broken by inheritance.

# Why It Matters

Using `sealed` by default is a common best practice in modern .NET development. It forces developers to favor composition over inheritance, which usually leads to cleaner designs. In high-performance systems, the micro-optimizations from devirtualization can add up.

# Code Example

```csharp
public sealed class CreditCardProcessor
{
    public void Process(decimal amount) 
    {
        // Critical logic that shouldn't be tampered with
    }
}

// This would cause a compile-time error:
// public class MaliciousProcessor : CreditCardProcessor { }
```

# Common Mistakes

- **Sealing a base class**: Preventing legitimate extension points in a framework.
- **Forgetting to seal overrides**: You can also seal specific overridden methods in a non-sealed class to prevent further redefinition: `public sealed override void SomeMethod()`.

# Follow-up Questions

- **Can a sealed class be abstract?** (Answer: No, because an abstract class *must* be inherited to be instantiated, creating a logical contradiction).
- **Does sealing affect memory?** (Answer: Not directly, but it can reduce the size of the virtual method table (vtable) and enable better inlining).
