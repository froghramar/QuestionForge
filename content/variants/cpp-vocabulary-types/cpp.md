---
id: variant.cpp-vocabulary-types.cpp
question: question.cpp-vocabulary-types
technology: tech.cpp
---
# Expected Answer (C++23)

Use `std::optional<T>` when absence is an ordinary outcome and no error detail is needed. Use `std::expected<T, E>` when an operation can either return a value or report a recoverable failure with useful error information. Use `std::variant<Ts...>` when a value can be exactly one of a known set of alternative types or states.

These types make outcomes explicit in function signatures and force callers to handle the non-success case deliberately.

```cpp
#include <expected>
#include <string>
#include <string_view>

std::expected<int, std::string> parse_port(std::string_view value) {
    if (value == "8080") {
        return 8080;
    }
    return std::unexpected("unsupported port");
}

int main() {
    const auto port = parse_port("8080");
    return port && *port == 8080 ? 0 : 1;
}
```

# Why It Matters

Vocabulary types remove ambiguity from APIs and reduce the chance that callers overlook absence or errors. They improve composition and testing by making each possible result explicit and inspectable.

# Common Mistakes

- **Using `optional` for a failure that callers need to diagnose:** The absence of error information makes recovery difficult; use `expected` when an error payload matters.
- **Calling `.value()` without checking:** It throws for an empty optional or unexpected expected result.
- **Using `variant` when multiple alternatives may be active:** A variant stores one alternative; use a different model for independent fields.

# Follow-up Questions

- **How do you inspect a variant safely?** (Answer: Use `std::visit`, `std::holds_alternative`, or `std::get_if`.)
- **What does `std::unexpected` construct?** (Answer: The error state of an `std::expected` result.)
