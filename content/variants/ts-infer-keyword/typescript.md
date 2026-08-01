---
id: variant.ts-infer-keyword.typescript
question: question.ts-infer-keyword
technology: tech.typescript
---
# Expected Answer
The `infer` keyword allows you to declare a type variable within the `extends` clause of a conditional type. This variable can then be used in the "true" branch of the condition to extract a specific type from a larger structure.

### Practical Example: Unpacking a Promise
If you want to know what type a `Promise` resolves to:

```typescript
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnpackPromise<Promise<string>>; // Result is 'string'
type NonPromise = UnpackPromise<number>; // NonPromise is 'number'
```

### Advanced Usage: Function Return Types
You can use it to extract the return type of a function:
```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### Why it's useful
It allows for highly dynamic type transformations without having to explicitly pass every sub-type as a generic parameter. It is the basis for many built-in TypeScript utility types like `ReturnType`, `Parameters`, and `Awaited`.

# Common Mistakes
- **Scope:** Trying to use the inferred type in the `false` branch of the conditional (it's only available in the `true` branch).
- **Multiple Inferences:** Getting confused when inferring from multiple positions (e.g., inferring both the argument and return type of a function).

# Follow-up Questions
- How would you use `infer` to get the element type of an array? (Answer: `T extends (infer U)[] ? U : T`).
- Can you use `infer` in template literal types? (Answer: Yes, for string manipulation).
