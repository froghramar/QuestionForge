---
id: variant.js-array-map-new-array.typescript
question: question.js-array-map-new-array
technology: tech.typescript
---
# Expected Answer

Yes, `Array.map()` creates a new array. In TypeScript, `map` is a **generic method** that allows for type-safe transformations.

The signature looks roughly like this:
`map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[]`

This means that if you have an array of type `T[]`, and your callback returns a value of type `U`, `map` will return a new array of type `U[]`.

# Why It Matters

TypeScript's type inference makes `map` extremely powerful for data transformation. It ensures that the resulting array's type is correctly tracked through your application, preventing "property undefined" errors that often occur when manually iterating and pushing to a new array.

# Example Code

### Type Transformation

```typescript
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Automatically inferred as string[]
const names = users.map(user => user.name);
```

### Readonly Arrays

If you are using `ReadonlyArray<T>`, `map` is one of the few methods available because it does not mutate the original.

```typescript
const nums: readonly number[] = [1, 2, 3];
// nums.push(4); // Error: Property 'push' does not exist
const doubled = nums.map(n => n * 2); // OK: returns a new array
```

# Common Mistakes

- **Incorrect Type Casting**: Sometimes developers try to cast the result of `map` instead of letting TypeScript infer it, which can hide bugs if the callback logic changes.
- **Handling Optional Properties**: When mapping objects with optional properties, ensure your callback handles `undefined` values correctly to maintain type safety in the resulting array.

# Follow-up Questions

- **How does TypeScript handle the type of the new array?** (Answer: It uses generics. The type of the output array is determined by the return type of the callback function).
- **Can `map` change the type of the elements?** (Answer: Yes, this is one of its primary uses—for example, mapping a list of domain objects to a list of UI ViewModels).

# References

- [TypeScript Lib Definition: Array.map](https://github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts)
- [MDN Web Docs: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
