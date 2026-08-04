---
id: variant.dotnet-disposal.cpp
question: question.dotnet-disposal
technology: tech.cpp
---
# Expected Answer (C++23)

C++ uses RAII (Resource Acquisition Is Initialization): a resource is acquired by an object's constructor and released by its destructor when the object leaves scope. This makes cleanup deterministic across normal returns and exceptions, and applies to files, locks, sockets, transactions, and heap ownership.

Avoid manually pairing `new`/`delete` or `lock`/`unlock` in application code. Encapsulate the resource in a standard RAII type such as `std::unique_ptr`, `std::lock_guard`, or a dedicated wrapper.

```cpp
#include <mutex>

std::mutex cache_mutex;

void update_cache() {
    std::lock_guard<std::mutex> lock(cache_mutex);
    // The mutex is released automatically, including if this block throws.
}
```

# Why It Matters

RAII prevents leaks and forgotten cleanup on every exit path without requiring garbage collection. It is one of C++'s core reliability mechanisms and a foundation of exception-safe code.

# Common Mistakes

- **Managing resources with raw `new` and `delete`:** Manual ownership is error-prone; use an owning RAII wrapper.
- **Assuming destructors can safely throw during unwinding:** A second exception during stack unwinding calls `std::terminate`.
- **Calling `release()` on a smart pointer without assigning ownership elsewhere:** This discards automatic cleanup and can leak the resource.

# Follow-up Questions

- **Why do destructors run during exception unwinding?** (Answer: To release objects whose scopes are being exited.)
- **What is the purpose of `std::lock_guard`?** (Answer: It locks a mutex on construction and unlocks it on destruction.)
