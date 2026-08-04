---
id: variant.cpp-initialization.cpp
question: question.cpp-initialization
technology: tech.cpp
---
# Expected Answer (C++23)

C++ supports copy initialization, direct initialization, and list initialization. Braces use list initialization and reject narrowing conversions, which can prevent silent loss of information. However, braces can prefer an `std::initializer_list` constructor, so they are not always interchangeable with parentheses.

Choose the form that expresses the intended construction and understand how the target type's constructors participate in overload resolution.

```cpp
#include <vector>

int main() {
    int count{3};
    // int truncated{3.5}; // Error: narrowing conversion.

    std::vector<int> values{3, 4}; // Two elements: 3 and 4.
    std::vector<int> repeated(3, 4); // Three elements, each 4.

    return values.size() == 2 && repeated.size() == 3 ? 0 : 1;
}
```

# Why It Matters

Initialization choices can change a program's meaning while looking superficially similar. Brace initialization catches lossy conversions, and understanding constructor selection prevents subtle container and API bugs.

# Common Mistakes

- **Assuming braces and parentheses always choose the same constructor:** An initializer-list overload can change the result.
- **Using parentheses when narrowing should be rejected:** A conversion may compile but lose data.
- **Interpreting `std::vector<int>{3, 4}` as a size and fill value:** It constructs a two-element vector.

# Follow-up Questions

- **What does value initialization do for an `int`?** (Answer: It initializes it to zero.)
- **Why might an API offer an `initializer_list` constructor?** (Answer: To support natural brace-list construction from a set of values.)
