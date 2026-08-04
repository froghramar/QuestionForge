---
id: variant.cpp-undefined-behavior.cpp
question: question.cpp-undefined-behavior
technology: tech.cpp
---
# Expected Answer (C++23)

Undefined behavior is an operation for which the C++ standard imposes no requirements. The program might appear to work, crash, produce an incorrect value, or be transformed unexpectedly by optimization. It is not a normal exception or reliably catchable runtime condition.

Examples include accessing an array out of bounds, dereferencing a dangling pointer, overflowing a signed integer, and a data race. Prevent it through strong ownership and bounds-aware APIs; use compiler warnings and runtime sanitizers to find bugs during development.

```cpp
#include <array>

int main() {
    std::array<int, 2> values{1, 2};
    // values[2] = 3; // Undefined behavior: out-of-bounds access.

    values.at(1) = 3; // Bounds-checked; throws on an invalid index.
    return values[1] == 3 ? 0 : 1;
}
```

# Why It Matters

Undefined behavior can undermine security, correctness, and portability in ways that evade normal testing. Knowing where it arises leads to designs that are both safer and easier for compilers to optimize correctly.

# Common Mistakes

- **Treating a successful test run as proof that undefined behavior is harmless:** The result can vary with input, compiler, optimization, or surrounding code.
- **Relying on signed-integer wraparound:** Signed overflow is undefined; use checked logic or an appropriate unsigned/modular design when intended.
- **Assuming sanitizers catch every issue:** They cover many important cases but depend on executed paths and enabled instrumentation.

# Follow-up Questions

- **Why can an optimizer exploit undefined behavior?** (Answer: It may assume valid programs never execute an undefined operation when transforming code.)
- **What tool helps detect out-of-bounds and use-after-free errors?** (Answer: AddressSanitizer.)
