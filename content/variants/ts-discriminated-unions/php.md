---
id: variant.ts-discriminated-unions.php
question: question.ts-unions-exhaustive
technology: tech.php
---
# Expected Answer (PHP 8.5)

PHP does not have native Discriminated Unions like TypeScript, but it uses **Enums** and **Match Expressions** to achieve similar type-safe results.

1.  **Enums**: Introduced in PHP 8.1. They can have methods and implement interfaces.
2.  **Match Expression**: A strictly typed, exhaustive version of `switch`.
3.  **DTOs with Type Hinting**: Using `readonly` properties and Union Types (`string|int`) to model complex data.

# Why It Matters

Before PHP 8, developers relied on strings or integers (constants) to represent states, which were prone to typos and lacked type safety. PHP 8.1 Enums combined with `match` provide compile-time (or rather, runtime-check) safety for state machines.

# Code Example

```php
enum Status {
    case Pending;
    case Active;
    case Deleted;
}

function getLabel(Status $status): string {
    return match($status) {
        Status::Pending => 'Waiting...',
        Status::Active  => 'Live',
        Status::Deleted => 'Archived',
        // 'match' is exhaustive; if Status::Deleted was missing, 
        // it would throw an UnhandledMatchError.
    };
}
```

# Common Mistakes

-   **Using 'default' in match**: Similar to Java/TypeScript, adding a `default` arm in a `match` expression bypasses the exhaustiveness check, making it harder to find missing cases when the Enum grows.
-   **Backed Enums vs Pure Enums**: Forgetting that Pure Enums cannot be directly serialized to a string or integer without using a Backed Enum (`enum Status: string`).

# Follow-up Questions

-   **Can PHP Enums have properties?** (Answer: No, but they can have methods and constants).
-   **How do you simulate a union of types in a parameter?** (Answer: Using Union Types, e.g., `string|int|null`).
---
