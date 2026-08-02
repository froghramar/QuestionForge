---
id: variant.js-array-map-new-array.javascript
question: question.js-array-map-new-array
technology: tech.javascript
---
# Expected Answer

Yes, `Array.map()` **always creates a new array**. 

It iterates over the original array and executes a callback function for each element. The return value of that callback is placed into the same index of a new array, which is then returned after the iteration is complete. The original array remains unchanged.

# Why It Matters

In modern JavaScript development (especially with React, Redux, or Vue), **immutability** is a core principle. You should not modify existing state; instead, you create new versions of it. `map()` is the standard tool for transforming data without side effects. If you don't need the returned array, you should probably use `forEach()` instead.

# Example Code

### Basic Usage

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

console.log(numbers); // [1, 2, 3] (Original unchanged)
console.log(doubled); // [2, 4, 6] (New array)
```

### Shallow Copy Warning

If the array contains objects, `map()` creates a new array, but the elements in that new array still point to the same objects in memory.

```javascript
const users = [{ name: 'Alice' }, { name: 'Bob' }];
const newUsers = users.map(u => u);

newUsers[0].name = 'Charlie';
console.log(users[0].name); // 'Charlie' (Mutation!)
```

# Common Mistakes

- **Not returning a value from the callback**: If you forget the `return` statement (or don't use an implicit return), the new array will be full of `undefined`.
- **Using `map` when `forEach` is appropriate**: If you aren't using the returned array and are just performing side effects (like logging), `forEach` is more semantically correct and slightly more performant.
- **Mutating elements inside `map`**: Developers sometimes modify the elements of the original array inside the `map` callback. This defeats the purpose of using a non-mutating method.

# Follow-up Questions

- **What is the difference between `map()` and `forEach()`?** (Answer: `map` returns a new array, `forEach` returns `undefined`).
- **Does `filter()` also create a new array?** (Answer: Yes, it returns a new array containing only elements that pass the predicate).
- **How would you create a deep copy of an array of objects using `map()`?** (Answer: By returning a clone of each object, e.g., `arr.map(obj => ({ ...obj }))`).

# References

- [MDN Web Docs: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
