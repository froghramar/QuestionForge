---
id: variant.cpp-exception-safety.cpp
question: question.cpp-exception-safety
technology: tech.cpp
---
# Expected Answer (C++23)

Exception safety describes what an operation guarantees if it throws. The basic guarantee leaves all objects valid and avoids resource leaks, though observable state may have changed. The strong guarantee is transactional: the operation either completes or leaves state unchanged. The no-throw guarantee promises no exception escapes.

RAII provides the foundation: local guards and owning objects clean up while the stack unwinds. For a strong guarantee, perform fallible work first and commit a non-throwing state change only after it succeeds.

```cpp
#include <string>
#include <utility>

class Profile {
public:
    void set_name(std::string name) {
        // Construction of the parameter happens before the function body.
        // Swapping two std::strings is non-throwing.
        name_.swap(name);
    }

private:
    std::string name_;
};
```

If construction of the argument fails, `name_` is unchanged. Once in the function, the non-throwing swap commits the update.

# Why It Matters

Clear guarantees preserve invariants in the face of allocation, I/O, and user-code failures. They make libraries safer to compose and prevent half-applied updates that are difficult to recover from.

# Common Mistakes

- **Manually releasing resources only on success:** An exception skips that cleanup; use RAII guards.
- **Throwing from a destructor during stack unwinding:** A second active exception causes `std::terminate`.
- **Marking a function `noexcept` without enforcing it:** If it throws, the program terminates rather than propagating an error.

# Follow-up Questions

- **Why does `std::vector` care whether a move constructor is `noexcept`?** (Answer: It can use a non-throwing move during reallocation while preserving its strong guarantee.)
- **What is the basic guarantee?** (Answer: No resource leaks and all objects remain valid, though their state may have changed.)
