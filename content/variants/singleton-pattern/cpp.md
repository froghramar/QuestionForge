---
id: variant.singleton-pattern.cpp
question: question.singleton-pattern
technology: tech.cpp
---
# Expected Answer (C++23)

For a process-wide singleton in modern C++, a function-local static is usually the simplest implementation. Since C++11, initialization of a local static is thread-safe: the object is initialized once, and callers wait if another thread is performing that initialization.

Prefer explicit dependency injection when practical because global state hides dependencies and makes tests harder. A singleton should have a clear lifetime and avoid order-dependent initialization across translation units.

```cpp
#include <string>

class Settings {
public:
    static Settings& instance() {
        static Settings settings;
        return settings;
    }

    std::string environment() const { return "production"; }

    Settings(const Settings&) = delete;
    Settings& operator=(const Settings&) = delete;

private:
    Settings() = default;
};

int main() {
    return Settings::instance().environment() == "production" ? 0 : 1;
}
```

# Why It Matters

This pattern is common for process-wide configuration, registries, and logging, but it can create hidden coupling. Knowing the initialization guarantee avoids unsafe manual double-checked locking.

# Common Mistakes

- **Implementing manual lazy initialization without synchronization:** Concurrent callers can create or observe partially initialized state.
- **Using a non-virtual public destructor to imply manual ownership:** The function-local static owns its lifetime; callers should not delete it.
- **Using a singleton for ordinary dependencies:** It makes test replacement and lifecycle control unnecessarily difficult.

# Follow-up Questions

- **When is the local static destroyed?** (Answer: Normally during program termination, after `main` returns or `std::exit` is called.)
- **What is the static initialization order problem?** (Answer: Initialization order of non-local statics across translation units is unspecified.)
