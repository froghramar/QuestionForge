---
id: variant.virtual-vs-override.php
question: question.virtual-vs-override
technology: tech.php
---
# Expected Answer (PHP 8.5)

PHP handles polymorphism implicitly:

- **Implicitly Virtual**: In PHP, all class methods are **implicitly virtual**. Any method in a parent class can be overridden by a child class unless it is marked as `final`.
- **`parent::` keyword**: To call the base class implementation from the child class.
- **Attributes**: PHP does not have a native `#Override` attribute that enforces checks at the compiler level (like Java's `@Override`), though some IDEs and static analyzers (like PHPStan) use annotations.

# Why It Matters

The default-virtual behavior makes it very easy to implement the "Template Method" pattern or extend framework classes. However, it also means you must be careful to mark critical methods as `final` if you want to prevent them from being changed.

# Code Example

```php
class Animal {
    public function makeSound(): string {
        return "Generic Sound";
    }
}

class Dog extends Animal {
    public function makeSound(): string {
        return "Bark!"; // Overridden
    }

    public function getOriginalSound(): string {
        return parent::makeSound(); // Call base
    }
}
```

# Common Mistakes

-   **Incompatible Signatures**: Overriding a method but changing the parameter types or count. PHP will throw a "Fatal Error" or "Warning" depending on the version and type of incompatibility (Liskov Substitution Principle violation).
-   **Assuming private methods can be overridden**: Private methods are not visible to child classes, so "overriding" them actually just creates a new, unrelated method in the child class.

# Follow-up Questions

-   **What is the 'final' keyword?** (Answer: Used to prevent a class or method from being overridden or inherited).
-   **Can you change the visibility when overriding?** (Answer: Yes, but only to make it *more* visible (e.g., `protected` to `public`), not less).
---
