---
id: variant.cpp-smart-pointers.cpp
question: question.cpp-smart-pointers
technology: tech.cpp
---
# Expected Answer (C++23)

Use `std::unique_ptr<T>` for exclusive heap ownership; it is lightweight and communicates that one component controls lifetime. Use `std::shared_ptr<T>` only when ownership genuinely must be shared and no single owner can be identified. `std::weak_ptr<T>` breaks cycles and lets code check whether a shared object still exists without extending its lifetime.

Raw pointers and references can still be useful as non-owning views, but their lifetime must be guaranteed by another owner. Prefer factory helpers to avoid a window where a raw allocation could leak if later construction throws.

```cpp
#include <memory>
#include <string>

struct Connection {
    explicit Connection(std::string name) : name(std::move(name)) {}
    std::string name;
};

int main() {
    auto connection = std::make_unique<Connection>("primary");
    // Ownership can be transferred, not copied.
    auto worker_connection = std::move(connection);
}
```

# Why It Matters

Explicit ownership avoids leaks and double deletion while making APIs easier to reason about. Unnecessary shared ownership creates hidden lifetime coupling, atomic-counting overhead, and cycles that leak memory.

# Common Mistakes

- **Using `shared_ptr` by default:** It hides ownership responsibility and costs more than exclusive ownership.
- **Creating two `shared_ptr` objects from the same raw pointer:** Each control block tries to delete the object, causing double deletion.
- **Using only `shared_ptr` for two-way relationships:** A cycle keeps both objects alive; one direction usually needs `weak_ptr`.

# Follow-up Questions

- **What does `weak_ptr::lock()` return?** (Answer: A `shared_ptr` if the object is still alive, otherwise an empty `shared_ptr`.)
- **Why use `make_unique`?** (Answer: It is concise and exception-safe, and clearly constructs one owning pointer.)
