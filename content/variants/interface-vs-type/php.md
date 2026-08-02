---
id: variant.interface-vs-type.php
question: question.interface-vs-type
technology: tech.php
---
# Expected Answer (PHP 8.5)

PHP has a structural difference in how it handles "types" compared to TypeScript:

1.  **Interfaces**: The primary way to define a contract. A class must explicitly `implement` an interface.
2.  **Type Hinting**: PHP uses native types (`string`, `int`, `bool`, `array`, `object`) and class/interface names for type hinting.
3.  **Union & Intersection Types**: PHP 8.0 introduced `string|int` (Union) and PHP 8.1 introduced `Iterator&Countable` (Intersection).
4.  **DNF Types (PHP 8.2)**: Disjunctive Normal Form allows combining unions and intersections, e.g., `(A&B)|C`.

# Why It Matters

PHP is a dynamically typed language with an increasingly powerful static type system. Unlike TypeScript, PHP's types are enforced at **runtime**. Understanding the difference between an Interface (a contract) and a Type Hint (a constraint) is key to writing modern, safe PHP.

# Code Example

```php
interface Logger {
    public function log(string $message): void;
}

// Union Type Example
function process(string|int $input) {
    // ...
}

// Intersection Type Example
function handle(Iterator&Countable $collection) {
    echo count($collection);
}
```

# Common Mistakes

-   **Confusing Type Hinting with Type Casting**: Type hints enforce the type at the entry point of a function; they don't automatically convert the data (unless strict_types is off and the data is compatible).
-   **Over-using `mixed`**: Using the `mixed` type hint defeats the purpose of the type system and should be avoided in favor of specific Union types.

# Follow-up Questions

-   **What does `declare(strict_types=1);` do?** (Answer: It forces strict type checking for function calls, preventing the automatic coercion of types like '1' into 1).
-   **Can you define a "Type Alias" in PHP?** (Answer: No, PHP does not have a `type` keyword. You must use interfaces or DTOs to represent complex shapes).
---
