---
id: variant.cpp-memory-model.cpp
question: question.cpp-memory-model
technology: tech.cpp
---
# Expected Answer (C++23)

A data race occurs when threads access the same memory concurrently, at least one access writes, and the accesses are not synchronized. In C++, this is undefined behavior, so the compiler and CPU may make assumptions that invalidate intuitive source-level reasoning.

Use a mutex for ordinary shared mutable state. It protects a critical section and establishes the necessary ordering when one thread unlocks and another locks the same mutex. Use atomics only when a simple atomic variable or a carefully designed lock-free protocol is genuinely required. `volatile` does not provide thread safety.

```cpp
#include <mutex>

class Counter {
public:
    void increment() {
        std::lock_guard<std::mutex> lock(mutex_);
        ++value_;
    }

    int value() const {
        std::lock_guard<std::mutex> lock(mutex_);
        return value_;
    }

private:
    mutable std::mutex mutex_;
    int value_ = 0;
};
```

# Why It Matters

Correct synchronization protects data integrity and makes concurrent code portable across optimizers and hardware. A design that appears to work in a debug build can fail unpredictably once a data race is present.

# Common Mistakes

- **Protecting writes but not reads:** A read concurrent with a write is still a data race.
- **Using `volatile` for inter-thread communication:** It is for special memory access behavior, not synchronization.
- **Replacing a simple mutex with complicated atomics prematurely:** Incorrect memory ordering is difficult to test and review.

# Follow-up Questions

- **What does `std::lock_guard` guarantee?** (Answer: It unlocks the mutex automatically when the guard leaves scope.)
- **What is an atomic operation useful for?** (Answer: Simple shared flags or counters where a single atomic operation expresses the needed synchronization.)
