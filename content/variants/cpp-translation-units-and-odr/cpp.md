---
id: variant.cpp-translation-units-and-odr.cpp
question: question.cpp-translation-units-and-odr
technology: tech.cpp
---
# Expected Answer (C++23)

A translation unit is one source file after preprocessing, including the headers it includes. The compiler processes translation units independently, and the linker combines their object files. A declaration tells the compiler that an entity exists; a definition supplies its implementation or storage.

The One Definition Rule requires compatible definitions across the program and generally permits only one definition of a non-inline function or variable with external linkage. Definitions intended to be included in multiple translation units—such as templates and inline functions—must be identical.

```cpp
// math.hpp
#pragma once

inline int square(int value) {
    return value * value;
}

// math.cpp
// A non-inline function definition belongs in one source file.
int cube(int value) {
    return value * value * value;
}
```

The `inline` keyword here primarily permits the function definition to appear in multiple translation units; it does not require the compiler to inline machine code.

# Why It Matters

ODR violations can cause link failures or undefined behavior that varies by compiler, optimization level, and build layout. Good header boundaries also reduce rebuild times and avoid exposing implementation details.

# Common Mistakes

- **Defining an ordinary non-inline function in a header:** Every translation unit that includes it may emit a conflicting definition.
- **Assuming `inline` is an optimization command:** It is mainly an ODR/linkage tool in this context.
- **Putting a template declaration in a header but its definition only in a source file:** Callers need the definition available for instantiation.

# Follow-up Questions

- **What does an include guard prevent?** (Answer: Repeated inclusion of the same header in one translation unit.)
- **Why can a class definition live in a header?** (Answer: It may be included in multiple translation units as long as every definition is equivalent.)
