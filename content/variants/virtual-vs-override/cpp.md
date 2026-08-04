---
id: variant.virtual-vs-override.cpp
question: question.virtual-vs-override
technology: tech.cpp
---
# Expected Answer (C++23)

In C++, a `virtual` member function enables runtime dispatch through a base-class pointer or reference. A derived class provides an override with the same compatible signature. Marking the derived declaration `override` asks the compiler to verify that it truly overrides a virtual base function, preventing accidental overloads caused by a signature mismatch.

Polymorphic base classes that may be destroyed through a base pointer need a virtual destructor so the derived destructor runs.

```cpp
#include <memory>
#include <string>

class Formatter {
public:
    virtual ~Formatter() = default;
    virtual std::string format() const { return "plain"; }
};

class JsonFormatter final : public Formatter {
public:
    std::string format() const override { return "json"; }
};

int main() {
    std::unique_ptr<Formatter> formatter = std::make_unique<JsonFormatter>();
    return formatter->format() == "json" ? 0 : 1;
}
```

# Why It Matters

Correct virtual dispatch enables safe runtime polymorphism in extensible C++ APIs. `override` and virtual destructors prevent subtle behavior bugs and undefined behavior during deletion through base pointers.

# Common Mistakes

- **Omitting `override`:** A signature mismatch can silently introduce a new function rather than overriding the base member.
- **Deleting a derived object through a base pointer without a virtual destructor:** The derived cleanup may not run, causing undefined behavior.
- **Using inheritance where composition is simpler:** Virtual hierarchies add coupling and runtime dispatch that may not be needed.

# Follow-up Questions

- **What does `final` do?** (Answer: It prevents a class from being derived or a virtual function from being overridden further.)
- **Why pass polymorphic objects by reference or pointer?** (Answer: Passing by value can slice off the derived portion.)
