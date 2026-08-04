---
id: variant.encapsulation-vs-abstraction.cpp
question: question.encapsulation-vs-abstraction
technology: tech.cpp
---
# Expected Answer (C++23)

Encapsulation bundles data with operations and restricts direct access to preserve invariants. In C++, `private`, `protected`, and `public` access control are the core language mechanisms. Abstraction presents the essential behavior of a component while hiding irrelevant implementation details, often through a small class interface, a free-function API, or an abstract base class.

For example, a bank account can keep its balance private (encapsulation) and expose `deposit` and `withdraw` as the meaningful operations (abstraction). The implementation can later change storage, locking, or validation without forcing callers to change.

```cpp
#include <stdexcept>

class Account {
public:
    void deposit(int amount) {
        if (amount <= 0) throw std::invalid_argument("amount must be positive");
        balance_ += amount;
    }

    int balance() const { return balance_; }

private:
    int balance_ = 0;
};
```

# Why It Matters

Separating public behavior from representation prevents invalid state and reduces coupling. It lets C++ APIs evolve without exposing storage layout, ownership details, or synchronization choices to every caller.

# Common Mistakes

- **Making fields public for convenience:** Callers can bypass validation and become coupled to the representation.
- **Equating abstraction only with inheritance:** A well-designed concrete class or free-function interface can also be an abstraction.
- **Using `protected` data as a shortcut for reuse:** It couples derived classes to internals; prefer protected behavior or composition.

# Follow-up Questions

- **What is the difference between `private` and `protected`?** (Answer: Private members are inaccessible to derived classes; protected members are accessible to derived classes.)
- **Why return a read-only view rather than a mutable container member?** (Answer: It preserves invariants and prevents callers from mutating internal representation directly.)
