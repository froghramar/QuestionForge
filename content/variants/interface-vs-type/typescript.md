---
id: variant.interface-vs-type.typescript
question: question.interface-vs-type
technology: tech.typescript
---
# Expected Answer

Both `interface` and `type` can describe object shapes, but they differ in capabilities and intended use:

- **`interface`**: Primarily used for defining the "contract" of an object. Its most unique feature is **Declaration Merging**, where multiple definitions of the same interface are combined into one.
- **`type` alias**: More versatile. It can define unions, intersections, primitives, tuples, and mapped types—none of which an `interface` can do directly.

# Why It Matters

Consistency and extensibility. Using `interface` for public APIs allows consumers to augment your types (e.g., adding a property to a library's `Request` object). Using `type` is essential for complex type logic (unions, utility types) that makes TypeScript powerful. Mixing them without a strategy can lead to confusing codebases and blocked extension points.

# Example Code

### Interface: Extension & Merging

```typescript
interface User {
  id: string;
}

// Declaration Merging (Merged with the above)
interface User {
  name: string;
}

interface Admin extends User {
  role: 'admin';
}
```

### Type: Unions & Intersections

```typescript
type Result = Success | Error; // Union (Interface can't do this)
type Point = [number, number];  // Tuple

type Admin = User & { role: 'admin' }; // Intersection
```

# Common Mistakes

- **"Always use interface"**: A common outdated rule. `type` is mandatory for unions, mapped types, and conditional types.
- **"Always use type"**: This prevents consumers from using declaration merging, which is critical when writing libraries or augmenting global objects (like `window` or `ProcessEnv`).
- **Confusing `extends` with `&`**: While similar, `extends` provides better error messages by checking for compatibility, whereas `&` can silently result in `never` if types conflict.

# Follow-up Questions

- **What happens when you intersect two types with conflicting properties?** (Answer: The property type becomes `never`. For example, `{ x: string } & { x: number }` results in `x: never`).
- **Can a class implement a `type` alias?** (Answer: Yes, as long as the type alias represents an object shape, not a union or a primitive).

# References

- [TypeScript Handbook: Interfaces vs Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
