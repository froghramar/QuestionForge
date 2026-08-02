---
id: variant.sealed-classes.php
question: question.sealed-classes
technology: tech.php
---
# Expected Answer (PHP 8.5)

PHP does not have a `sealed` keyword exactly like C# or Java. Instead, it uses **`final`** and **`readonly`** classes to control inheritance and state.

- **`final` class**: Prevents any class from inheriting from it. `final class MyClass {}`.
- **`final` method**: Prevents a specific method from being overridden in a child class.
- **`readonly` class (PHP 8.2+)**: All properties are implicitly `readonly` and inheritance is restricted such that children must also be `readonly`.

# Why It Matters

Using `final` by default is a common practice in modern PHP (e.g., in Doctrine entities or Domain services). It prevents the "Fragile Base Class" problem and ensures that your internal implementation details aren't broken by unintentional inheritance.

# Code Example

```php
final class PaymentProcessor
{
    public function execute(float $amount): void
    {
        // This logic cannot be overridden or inherited
    }
}

// Fatal Error: Class MaliciousProcessor may not inherit from final class
// class MaliciousProcessor extends PaymentProcessor {}
```

# Common Mistakes

- **Sealing everything**: Being too aggressive with `final` can make it difficult for users of a library to mock or extend behavior when necessary.
- **Forgetting `final` on methods**: If a class is not final, but you have a critical method that shouldn't change, remember to mark the method as `final`.

# Follow-up Questions

- **Can an interface be final?** (Answer: No. Interfaces are meant to be implemented).
- **Readonly vs Final?** (Answer: `final` stops inheritance; `readonly` stops property modification).
---
