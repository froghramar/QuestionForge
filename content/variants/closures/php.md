---
id: variant.closures.php
question: question.closures
technology: tech.php
---
# Expected Answer (PHP 8.5)

In PHP, closures are implemented as anonymous functions (objects of the `Closure` class).

1.  **Lexical Scoping (`use`)**: Unlike JavaScript, PHP closures do not automatically capture variables from the outer scope. You must explicitly pass them using the `use` keyword.
2.  **By Value vs By Reference**: By default, variables are captured by value. To modify an outer variable, you must pass it by reference (`use (&$variable)`).
3.  **Arrow Functions (PHP 7.4+)**: Short syntax `fn($x) => $x + $y` which *does* capture variables from the outer scope by value automatically.

# Why It Matters

PHP's requirement for the `use` keyword makes scope management explicit. It prevents accidental variable captures and makes it clear what data the closure depends on.

# Code Example

```php
$multiplier = 2;

// Explicit capture by value
$double = function($number) use ($multiplier) {
    return $number * $multiplier;
};

// Arrow function (automatic capture by value)
$triple = fn($number) => $number * 3;

echo $double(5); // 10
```

# Common Mistakes

-   **Forgetting the `use` keyword**: Attempting to access an outer variable without `use` will result in an "Undefined variable" error.
-   **Expecting by-reference by default**: Changing a variable inside a standard closure doesn't affect the outer variable unless `&$variable` is used.

# Follow-up Questions

-   **Can closures be bound to objects?** (Answer: Yes, using `$closure->bindTo($object)` to change the value of `$this` inside the closure).
-   **Static Closures**: Why use `static function() {}`? (Answer: To prevent the closure from automatically binding the current class instance to `$this`, saving memory).
---
