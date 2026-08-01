---
id: variant.ts-infer-keyword.typescript
question: question.ts-infer-keyword
technology: tech.typescript
---
# Expected Answer

The `infer` keyword is used within **Conditional Types** to declare a type variable that TypeScript will attempt to "calculate" (infer) based on the input type. It allows you to extract sub-types from a larger structure like a function's return type, a Promise's resolution, or an array's element type.

It can only be used in the `extends` clause of a conditional type and the inferred variable is only available in the "true" branch.

# Why It Matters

`infer` is the engine behind TypeScript's meta-programming. It is used in nearly all built-in utility types (like `ReturnType`, `Awaited`, `Parameters`). Without `infer`, we couldn't write generic decorators, wrappers, or API clients that automatically know the shape of the data they are handling based on a provided function or promise.

# Example Code

### Extracting a Promise Result

```typescript
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnpackPromise<Promise<number>>; // number
type Direct = UnpackPromise<string>;           // string
```

### Extracting Function Return Type

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const myFunc = () => ({ id: 1 });
type MyFuncReturn = GetReturnType<typeof myFunc>; // { id: number }
```

# Common Mistakes

- **Using `infer` outside of conditional types**: It is syntactically invalid outside of a `T extends ... ?` block.
- **Scope issues**: Trying to use the inferred type in the "false" branch of the conditional, where it is not defined.
- **Complexity**: Over-nesting `infer` blocks, making types nearly impossible for teammates to read or debug.

# Follow-up Questions

- **How do you infer from an array?** (Answer: `T extends (infer U)[] ? U : never`).
- **What happens if multiple positions match the inference?** (Answer: If you infer from multiple positions (like multiple arguments of a function), TS will usually create a union or intersection depending on the variance).

# References

- [TypeScript Handbook: Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
