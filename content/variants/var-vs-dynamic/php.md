---
id: variant.var-vs-dynamic.php
question: question.var-vs-dynamic
technology: tech.php
---
# Expected Answer (PHP 8.5)

PHP is a **dynamically typed** language, meaning variables don't have a fixed type. However, it has moved toward "Gradual Typing."

1. **Dynamic Typing**: Variables can change types at any time. `$x = "hello"; $x = 123;`.
2. **Type Hinting**: You can (and should) enforce types for function parameters, return values, and class properties.
3. **`mixed` type**: Introduced in PHP 8.0, it represents "any type," similar to `dynamic` in C#, but it's a hint rather than a runtime behavior change.

# Why It Matters

Modern PHP (8.x) is much stricter than older versions. While variables are still dynamic, properties and method signatures are usually strictly typed. This gives you the flexibility of a dynamic language with the safety of a static one.

# Code Example

```php
// Dynamic behavior
$val = "Start";
$val = ["Now I am an array"];

// Strict typing (Modern PHP)
class User {
    public function __construct(
        public string $name, // Type Hinting
        public int|float $score // Union Types (PHP 8.0)
    ) {}
}
```

# Common Mistakes

-   **Not using `declare(strict_types=1);`**: Without this, PHP will still try to coerce types (e.g., passing `"5"` to an `int` parameter).
-   **Over-using `mixed`**: It's a "get out of jail free" card that should be used sparingly when you truly don't know the type.

# Follow-up Questions

-   **What are Union Types?** (Answer: Allowing a variable to be one of several types, e.g., `string|int`).
-   **What is Type Coercion?** (Answer: PHP's automatic conversion between types, like treating a non-empty string as `true` in an `if` statement).
---
