---
id: variant.cpp-const-correctness.cpp
question: question.cpp-const-correctness
technology: tech.cpp
---
# Expected Answer (C++23)

Const correctness makes mutation permissions part of an API. A `const` member function receives a pointer to const and cannot modify ordinary members. This allows callers with a const object or reference to use read-only operations safely.

For pointer declarations, read from the identifier outward: `const T*` points to a const `T`; `T* const` is a const pointer to mutable `T`; and `const T* const` is a const pointer to const `T`.

```cpp
#include <string>

class User {
public:
    explicit User(std::string name) : name_(std::move(name)) {}

    const std::string& name() const { return name_; }
    void rename(std::string name) { name_ = std::move(name); }

private:
    std::string name_;
};

int main() {
    const User user("Ada");
    return user.name() == "Ada" ? 0 : 1;
}
```

# Why It Matters

Const-correct APIs prevent accidental state changes and make code easier to reuse with read-only inputs. They also enable overloads and compiler diagnostics that expose incorrect ownership or mutation assumptions early.

# Common Mistakes

- **Omitting `const` from read-only member functions:** Const objects then cannot use otherwise safe operations.
- **Returning a mutable reference from a const getter:** This lets callers modify an object through a read-only interface.
- **Using `const_cast` to bypass a real const object:** Modifying an object originally declared const is undefined behavior.

# Follow-up Questions

- **When is `mutable` appropriate?** (Answer: For implementation details such as a cache or mutex that do not change the object's logical value.)
- **Can a non-const object call a const member function?** (Answer: Yes; const member functions are callable on both const and non-const objects.)
