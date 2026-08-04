---
id: variant.cpp-cast-operators.cpp
question: question.cpp-cast-operators
technology: tech.cpp
---
# Expected Answer (C++23)

Use named casts because each communicates a distinct intent. `static_cast` handles ordinary explicit conversions, including an unchecked downcast when the program can prove the dynamic type. `dynamic_cast` checks downcasts at runtime in a polymorphic hierarchy and returns `nullptr` for a failed pointer cast. `const_cast` only changes type qualification, and `reinterpret_cast` is a low-level conversion that should be rare.

Prefer designs that make casts unnecessary. When a cast is required, choose the narrowest operator and validate any runtime assumption.

```cpp
#include <memory>

class Shape {
public:
    virtual ~Shape() = default;
};

class Circle : public Shape {
public:
    int radius = 1;
};

int main() {
    std::unique_ptr<Shape> shape = std::make_unique<Circle>();
    if (auto* circle = dynamic_cast<Circle*>(shape.get())) {
        return circle->radius == 1 ? 0 : 1;
    }
    return 1;
}
```

# Why It Matters

The wrong cast can cause undefined behavior, discard qualifiers that protect invariants, or hide a flawed abstraction. Named casts make reviews and static analysis far more effective than opaque C-style casts.

# Common Mistakes

- **Using `static_cast` for an unproven downcast:** It does not check the dynamic type and using the result as the wrong derived type is undefined behavior.
- **Modifying an object originally declared const through `const_cast`:** This is undefined behavior.
- **Using `reinterpret_cast` as a general conversion tool:** It does not safely convert arbitrary object representations or establish object lifetime.

# Follow-up Questions

- **What must a base class have for `dynamic_cast` downcasts?** (Answer: At least one virtual function, making the hierarchy polymorphic.)
- **Why are C-style casts discouraged?** (Answer: They can perform several kinds of conversion while hiding which one and making unsafe operations harder to find.)
