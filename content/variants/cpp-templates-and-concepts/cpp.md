---
id: variant.cpp-templates-and-concepts.cpp
question: question.cpp-templates-and-concepts
technology: tech.cpp
---
# Expected Answer (C++23)

Templates allow an algorithm to work with many types and are generally instantiated at compile time, enabling static dispatch and optimization. Concepts constrain the types a template accepts, so invalid uses fail closer to the API boundary with a requirement that describes the intended operation.

Use concepts to express real semantic requirements, not merely to make a signature more complicated. Prefer runtime polymorphism when implementations must be selected dynamically or when reducing template instantiations matters more than static specialization.

```cpp
#include <concepts>

template <std::totally_ordered T>
constexpr const T& maximum(const T& left, const T& right) {
    return left < right ? right : left;
}

int main() {
    static_assert(maximum(3, 5) == 5);
}
```

# Why It Matters

Constrained templates produce reusable, efficient library code with clearer contracts than unconstrained template errors. They are widely used in modern C++ ranges, algorithms, and domain-specific abstractions.

# Common Mistakes

- **Using templates for behavior selected only at runtime:** Virtual functions or type erasure may be a better fit.
- **Writing overly broad or accidental constraints:** The constraint should match the operations the implementation truly needs.
- **Returning references to temporary arguments:** A generic function must preserve the same lifetime rules as non-template code.

# Follow-up Questions

- **What does a `requires` clause do?** (Answer: It makes a template viable only when its constraint is satisfied.)
- **How does static dispatch differ from virtual dispatch?** (Answer: Static dispatch is resolved for concrete types at compile time; virtual dispatch selects an override through a runtime vtable.)
