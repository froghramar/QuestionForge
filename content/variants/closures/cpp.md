---
id: variant.closures.cpp
question: question.closures
technology: tech.cpp
---
# Expected Answer (C++23)

A C++ lambda is an object with an `operator()` that can capture variables from its enclosing scope. Capture by value copies the captured value into the closure object; capture by reference stores a reference and therefore requires the referenced object to outlive every invocation of the lambda.

Choose capture mode deliberately. Default capture forms (`[=]` and `[&]`) can hide which values and lifetimes the closure depends on, especially when it is stored or runs asynchronously.

```cpp
#include <functional>
#include <string>

std::function<std::string()> make_greeting(std::string name) {
    return [name = std::move(name)] {
        return "Hello, " + name;
    };
}

int main() {
    auto greeting = make_greeting("Ada");
    return greeting() == "Hello, Ada!" ? 0 : 1;
}
```

# Why It Matters

Captures determine whether a closure owns its data or borrows it. Correct capture lifetimes prevent dangling references in callbacks, threads, and deferred work.

# Common Mistakes

- **Capturing a local variable by reference and returning the lambda:** The reference dangles after the function returns.
- **Using `[&]` in asynchronous work without a lifetime guarantee:** The task may run after the referenced objects are destroyed.
- **Assuming capture by value always avoids copies:** Init-capture with `std::move` can transfer an owned value into the closure.

# Follow-up Questions

- **What does `[this]` capture?** (Answer: It captures the `this` pointer, not a copy of the whole object.)
- **When should a lambda be `mutable`?** (Answer: When it captures by value and needs to modify its own captured copy.)
