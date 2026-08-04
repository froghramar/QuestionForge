---
id: variant.cpp-move-semantics.cpp
question: question.cpp-move-semantics
technology: tech.cpp
---
# Expected Answer (C++23)

Move semantics let an object transfer ownership of a resource instead of allocating and copying it. `std::move` does not move data; it casts its argument so overload resolution can select a move constructor or move assignment operator when one is available.

The Rule of Zero is preferred: compose a type from RAII members such as `std::string` and `std::vector`, so the compiler can generate correct special member functions. A type that directly manages a resource may need to define or delete its destructor, copy constructor, copy assignment operator, move constructor, and move assignment operator—the Rule of Five.

```cpp
#include <string>
#include <utility>

class Report {
public:
    explicit Report(std::string title) : title_(std::move(title)) {}

    // Rule of Zero: std::string manages its own resource correctly.
private:
    std::string title_;
};

int main() {
    std::string source = "ready";
    std::string destination = std::move(source);
    // source is valid but its content is unspecified.
}
```

# Why It Matters

Move operations avoid costly copies of buffers, containers, and handles while preserving clear ownership. Incorrect move implementations can leak, double-free, or leave objects in invalid states.

# Common Mistakes

- **Assuming `std::move` performs a move:** It only enables a move overload; the selected operation may still copy.
- **Reading a moved-from object's old value:** The object is valid but its content is unspecified unless the type documents otherwise.
- **Hand-writing special members for a type made of RAII members:** This often adds bugs; prefer the Rule of Zero.

# Follow-up Questions

- **Why should a move constructor often be `noexcept`?** (Answer: Containers can then safely use it during reallocation instead of falling back to copying.)
- **What does the Rule of Five extend?** (Answer: The Rule of Three by adding move construction and move assignment.)
