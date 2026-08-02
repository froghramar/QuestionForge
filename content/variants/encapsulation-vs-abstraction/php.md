---
id: variant.encapsulation-vs-abstraction.php
question: question.encapsulation-vs-abstraction
technology: tech.php
---
# Expected Answer (PHP 8.5)

In PHP, these OOP principles are implemented using visibility modifiers and interfaces:

1. **Encapsulation**: Using `private`, `protected`, and `public` to hide an object's internal state. PHP 8.x's **Constructor Property Promotion** makes this very concise.
2. **Abstraction**: Using `interface` and `abstract class` to define the "what" of an object.

# Why It Matters

Encapsulation prevents the "Spaghetti Code" where any part of the application can reach in and change an object's state. Abstraction allows you to use **Dependency Injection** to write code that is decoupled from specific implementations (e.g., `MailerInterface` instead of `SmtpMailer`).

# Code Example

```php
// Abstraction
interface Gateway {
    public function pay(int $amount): void;
}

// Encapsulation
class StripeGateway implements Gateway {
    // Constructor Property Promotion (PHP 8.0+)
    public function __construct(
        private string $apiKey // Capsule: Private data
    ) {}

    public function pay(int $amount): void {
        // Implementation hidden
    }
}
```

# Common Mistakes

-   **Using `public` properties by default**: Always favor `private` or `protected` with getters/setters (or `readonly` in PHP 8.1+) to maintain control.
-   **Missing return types**: Not using PHP 7/8's type system reduces the effectiveness of abstraction.

# Follow-up Questions

-   **What are 'Readonly' properties?** (Answer: Introduced in PHP 8.1, they can only be set once, providing a form of immutable encapsulation).
-   **Can a trait implement an interface?** (Answer: No, but a class using a trait can).
---
