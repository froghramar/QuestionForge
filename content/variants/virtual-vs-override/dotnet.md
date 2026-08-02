---
id: variant.virtual-vs-override.dotnet
question: question.virtual-vs-override
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

In C#, these keywords enable **Method Overriding** (Polymorphism):

- **`virtual`**: Applied to a method in the **Base Class**. It signals that this method *can* be overridden by derived classes, but it has a default implementation.
- **`override`**: Applied to a method in the **Derived Class**. It provides a specific implementation that replaces the base one when called on a derived object.

# Why It Matters

This allows for "Liskov Substitution"—you can treat different objects as their base type but get the specific behavior of their actual type at runtime.

# Code Example

```csharp
public class Animal
{
    public virtual void MakeSound() => Console.WriteLine("Generic Sound");
}

public class Dog : Animal
{
    public override void MakeSound() => Console.WriteLine("Bark!");
}

Animal myAnimal = new Dog();
myAnimal.MakeSound(); // Outputs: "Bark!" because of 'override'
```

# Common Mistakes

- **Using `new` instead of `override`**: The `new` keyword hides the base method (shadowing) rather than overriding it. If you call it via a base class reference, the *base* method will run.
- **Forgetting `virtual`**: You cannot override a method that isn't marked as `virtual`, `abstract`, or `override`.

# Follow-up Questions

- **Can you override a static method?** (Answer: No. Polymorphism is instance-based).
- **Difference between `abstract` and `virtual`?** (Answer: `abstract` methods have no body and *must* be overridden; `virtual` methods have a body and *may* be overridden).
