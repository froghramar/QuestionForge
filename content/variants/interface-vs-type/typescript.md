---
id: variant.interface-vs-type.typescript
question: question.interface-vs-type
technology: tech.typescript
---
# Expected Answer

Both `interface` and `type` can describe object shapes, but they differ in capabilities and intended use.

### Interface

```typescript
interface User {
  id: string;
  name: string;
}

// Declaration merging — same interface defined twice is merged
interface User {
  email: string;
}
// User now has id, name, AND email

// Extension
interface Admin extends User {
  role: 'admin';
}
```

### Type Alias

```typescript
// Unions — interfaces can't do this
type Result = Success | Error;

// Tuples
type Point = [number, number];

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Intersection (similar to extends)
type Admin = User & { role: 'admin' };
```

### When to Use Each

| Use `interface` when... | Use `type` when... |
|---|---|
| Defining object shapes for public APIs | Defining unions or intersections |
| You need declaration merging (e.g., augmenting library types) | Working with tuples, primitives, or mapped types |
| You want `extends` for clear hierarchies | Building utility types or conditional types |

### The Key Difference: Declaration Merging

This is the most practical difference. Libraries like `express` or `jest` expose interfaces so consumers can augment them:

```typescript
// Augmenting Express Request in your app
declare module 'express' {
  interface Request {
    user?: AuthUser;
  }
}
```

This is impossible with `type` — redefining a type alias is a compile error.

# Common Mistakes

- **"Always use interface"**: A common cargo-cult rule. `type` is necessary for unions, mapped types, and conditional types — which are used heavily in real TypeScript codebases.
- **"Always use type"**: Loses the ability to leverage declaration merging, which is essential when augmenting third-party library types.
- **Confusing `extends` with `&`**: They behave similarly for simple cases, but `extends` gives better error messages for incompatible types, while `&` silently creates `never` for conflicting properties.

# Follow-up Questions

- What happens when you intersect two types with conflicting properties? (Answer: The property type becomes `never`. For example, `{ x: string } & { x: number }` gives `x: never`, which makes the type unusable).
- Can a class implement a `type` alias? (Answer: Yes, as long as the type describes an object shape. `class Foo implements MyType {}` works for object types but not for unions or primitives).
