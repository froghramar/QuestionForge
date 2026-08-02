---
id: variant.encapsulation-vs-abstraction.dotnet
question: question.encapsulation-vs-abstraction
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

While related, Encapsulation and Abstraction solve different problems:

1. **Encapsulation** is about **Hiding Data**. It uses access modifiers (`private`, `protected`, `internal`) and properties to protect the internal state of an object. It ensures that an object is in control of its own data.
2. **Abstraction** is about **Hiding Complexity**. It uses interfaces and abstract classes to define *what* an object does without revealing *how* it does it.

# Why It Matters

In .NET, these principles allow us to build systems that are easy to maintain and test. By using interfaces (Abstraction), we can swap implementations (e.g., using a Mock database for tests). By using private fields and public properties (Encapsulation), we ensure that invalid data cannot be assigned to our objects.

# Code Example

```csharp
// Abstraction: I don't care HOW the message is sent, just that it is.
public interface IMailService 
{
    void Send(string message);
}

// Encapsulation: The balance is private and can only be changed via methods.
public class BankAccount
{
    private decimal _balance; // Hidden data

    public void Deposit(decimal amount) 
    {
        if (amount > 0) _balance += amount; // Logic protected
    }
}
```

# Common Mistakes

- **Public Fields**: Exposing raw fields directly violates encapsulation. Always use Properties.
- **Over-Abstraction**: Creating interfaces for every single class, even when there's only one possible implementation, leads to "Interface Bloat."

# Follow-up Questions

- **How do Properties in C# support encapsulation?** (Answer: They allow you to add validation logic in the `set` accessor while keeping the field private).
- **Can you have Abstraction without Encapsulation?** (Answer: Technically yes, but you lose the safety of the object's internal state).
