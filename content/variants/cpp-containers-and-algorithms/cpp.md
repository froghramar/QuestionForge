---
id: variant.cpp-containers-and-algorithms.cpp
question: question.cpp-containers-and-algorithms
technology: tech.cpp
---
# Expected Answer (C++23)

Choose a standard container from the required access and mutation pattern. `std::vector` is often the best default because it stores elements contiguously, supports fast indexed access, and has good cache locality. Use `std::unordered_map` for average constant-time key lookup when ordering is unnecessary, and `std::map` when ordered traversal or logarithmic worst-case lookup is needed.

Prefer standard algorithms and ranges to make intent explicit. They operate on iterator ranges, keeping an algorithm independent of the specific container.

```cpp
#include <algorithm>
#include <vector>

int main() {
    std::vector<int> values{3, 1, 4, 1, 5};

    std::ranges::sort(values);
    const auto found = std::ranges::find(values, 4);

    return found != values.end() ? 0 : 1;
}
```

Understand invalidation rules before holding iterators, references, or pointers into a container across mutations. In particular, a vector reallocation invalidates all of them.

# Why It Matters

Appropriate container and algorithm choices affect performance, memory use, and correctness. Ignoring invalidation rules creates bugs that can surface long after a seemingly harmless container operation.

# Common Mistakes

- **Choosing `std::list` by default for insertion efficiency:** Its poor locality and allocation overhead often outweigh that theoretical advantage.
- **Assuming `unordered_map` preserves insertion order:** It does not; iteration order is unspecified.
- **Keeping vector iterators across a possible reallocation:** Growth may invalidate every iterator, pointer, and reference into the vector.

# Follow-up Questions

- **What is `vector::reserve` useful for?** (Answer: It preallocates capacity to reduce reallocations when an approximate final size is known.)
- **Why does `std::map` require an ordering?** (Answer: It maintains keys in a tree ordered by its comparison function.)
