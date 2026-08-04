---
id: variant.cpp-value-categories.cpp
question: question.cpp-value-categories
technology: tech.cpp
---
# Expected Answer (C++23)

An lvalue is an expression with identity that can generally be referred to again; an rvalue is an expression used to initialize or move from another object. `T&&` is an rvalue reference type, but a named variable of that type is itself an lvalue expression because it has a stable name.

In a template where `T` is deduced, `T&&` is a forwarding reference. `std::forward<T>` preserves the caller's original value category when passing the argument onward. By contrast, `std::move` unconditionally casts to an xvalue.

```cpp
#include <utility>

void consume(int& value) { value += 1; }
void consume(int&& value) { value += 10; }

template <typename T>
void relay(T&& value) {
    consume(std::forward<T>(value));
}

int main() {
    int number = 1;
    relay(number); // Calls consume(int&).
    relay(1);      // Calls consume(int&&).
    return number == 2 ? 0 : 1;
}
```

# Why It Matters

Perfect forwarding lets generic factories and wrappers preserve caller intent without needless copies. Misusing it can select the wrong overload, move from reusable data, or make template errors difficult to diagnose.

# Common Mistakes

- **Calling `std::move` on every forwarding-reference parameter:** This treats lvalue callers as rvalues and may move from values they expected to retain.
- **Expecting a named `T&&` parameter to call an rvalue overload:** It is an lvalue until explicitly forwarded or moved.
- **Using forwarding references in simple APIs unnecessarily:** They complicate overload resolution; explicit value or reference parameters are often clearer.

# Follow-up Questions

- **What does `std::forward<T>` preserve?** (Answer: Whether the original argument was an lvalue or rvalue.)
- **When is `std::move` appropriate?** (Answer: When the current code intentionally treats an object as expiring and will not rely on its prior value.)
