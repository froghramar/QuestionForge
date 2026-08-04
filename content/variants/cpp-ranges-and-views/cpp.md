---
id: variant.cpp-ranges-and-views.cpp
question: question.cpp-ranges-and-views
technology: tech.cpp
---
# Expected Answer (C++23)

Ranges represent iterable sequences, and views adapt a range without generally allocating or owning a new container. View adaptors are lazy: a filter and transform pipeline computes elements as the result is iterated. This can be expressive and efficient, but the underlying range must outlive the view.

Materialize the result into a container when it needs independent ownership, repeated traversal that would otherwise repeat work, or an API that requires a concrete collection.

```cpp
#include <ranges>
#include <vector>

int main() {
    std::vector<int> values{1, 2, 3, 4};

    auto doubled_evens = values
        | std::views::filter([](int value) { return value % 2 == 0; })
        | std::views::transform([](int value) { return value * 2; });

    int total = 0;
    for (int value : doubled_evens) {
        total += value;
    }
    return total == 12 ? 0 : 1;
}
```

# Why It Matters

Views make data transformations clear without temporary containers, but non-owning lazy pipelines can dangle or change as their underlying data changes. Correct lifetime handling is as important as the concise syntax.

# Common Mistakes

- **Returning a view over a destroyed local container:** The view does not own the elements and becomes invalid.
- **Assuming a view is a snapshot:** It usually observes the underlying range when iterated.
- **Using a lazy pipeline where immediate validation or ownership is needed:** Materialize deliberately into a container.

# Follow-up Questions

- **What does a filter view do?** (Answer: It lazily yields only elements satisfying its predicate.)
- **Why can views improve performance?** (Answer: They compose operations without necessarily allocating intermediate containers.)
