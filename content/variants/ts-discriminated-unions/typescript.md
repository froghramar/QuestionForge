---
id: variant.ts-unions-exhaustive.typescript
question: question.ts-unions-exhaustive
technology: tech.typescript
---
# Expected Answer
A **Discriminated Union** is a pattern where several types share a common property (the "discriminant") with a literal value. TypeScript's narrowing logic uses this property to differentiate between members of the union.

### Example
```typescript
interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; side: number; }
type Shape = Circle | Square;
```

### Exhaustiveness Checking
To ensure a `switch` or `if` block handles every member of a union, you can use the `never` type. If a variable's type is narrowed to `never`, it means every possible case has been handled.

```typescript
function getArea(s: Shape) {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side * s.side;
    default:
      const _exhaustiveCheck: never = s;
      return _exhaustiveCheck;
  }
}
```
If you add a `Triangle` to the `Shape` union later, the `default` block will fail to compile because `s` will be of type `Triangle`, which is not assignable to `never`.

# Common Mistakes
- **Implicit Narrowing:** Relying on magic strings instead of a literal type discriminant.
- **Forgetting the `never` check:** Losing compile-time safety when the union is expanded in the future.

# Follow-up Questions
- How does this differ from `instanceof` narrowing?
- Can you use a boolean as a discriminant? (Answer: Yes, but it only allows for two states).
