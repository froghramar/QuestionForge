---
id: variant.ts-discriminated-unions.typescript
question: question.ts-unions-exhaustive
technology: tech.typescript
---
# Expected Answer

A **Discriminated Union** (also known as a Tagged Union) is a pattern where several types share a common property with a literal value (the "discriminant" or "tag"). TypeScript's type narrowing logic uses this property to differentiate between members of the union with 100% type safety.

To ensure **Exhaustiveness Checking**, you can use the `never` type in a `default` block. If the union is ever expanded but the handling logic isn't, the code will fail to compile.

# Why It Matters

This is the gold standard for modeling state in TypeScript (e.g., API responses, Redux actions). It eliminates the need for manual type casting (`as`) and prevents bugs where you accidentally access a property that only exists on a different member of the union. It forces the developer to handle every possible state of the data.

# Example Code

```typescript
interface Success { kind: 'success'; data: string; }
interface Error { kind: 'error'; message: string; }
interface Loading { kind: 'loading'; }

type ApiResponse = Success | Error | Loading;

function handleResponse(res: ApiResponse) {
  switch (res.kind) {
    case 'success':
      return res.data; // narrowed to Success
    case 'error':
      return res.message; // narrowed to Error
    case 'loading':
      return 'Loading...';
    default:
      // Exhaustiveness check
      const _exhaustive: never = res;
      throw new Error(`Unhandled case: ${_exhaustive}`);
  }
}
```

# Common Mistakes

- **Using non-literal discriminants**: Trying to use a `string` or `number` instead of a literal type (e.g., `'success'`). TypeScript cannot narrow the type unless the tag is a specific literal value.
- **Forgetting the `never` check**: Losing the compile-time safety that ensures new members of the union are handled when they are added later.

# Follow-up Questions

- **Can you use a boolean as a discriminant?** (Answer: Yes, it works for unions of two types, but you lose the descriptive "tag" name).
- **How does this relate to Pattern Matching?** (Answer: It is the foundation for pattern matching in functional languages, and while TS doesn't have native pattern matching syntax yet, discriminated unions provide the same safety).

# References

- [TypeScript Handbook: Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
