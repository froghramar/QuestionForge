---
id: variant.rust-iterators.rust
question: question.rust-iterators
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

Iterator adapters such as `map`, `filter`, and `take` describe a lazy computation. They do not run until a consuming operation such as `collect`, `sum`, `fold`, or a `for` loop pulls values from the iterator. This allows transformations to compose efficiently without an intermediate collection unless one is explicitly created.

For collections, `iter()` yields immutable references, `iter_mut()` yields mutable references, and `into_iter()` consumes the collection and yields owned elements in the usual case.

```rust
fn main() {
    let values = vec![1, 2, 3, 4];

    let doubled_evens: Vec<i32> = values
        .iter()
        .filter(|value| **value % 2 == 0)
        .map(|value| value * 2)
        .collect();

    assert_eq!(doubled_evens, vec![4, 8]);
    assert_eq!(values, vec![1, 2, 3, 4]);
}
```

# Why It Matters

Ownership-aware iterator use avoids needless allocation and clones while making data transformations concise. It also lets APIs communicate whether they inspect, mutate, or consume caller data.

# Common Mistakes

- **Expecting an adapter chain to execute by itself:** It needs a consumer to drive it.
- **Using `into_iter()` then trying to reuse the collection:** It usually moves elements out and consumes the collection.
- **Collecting too early:** This can allocate an intermediate vector that a single lazy pipeline would avoid.

# Follow-up Questions

- **How does `collect` infer its target type?** (Answer: From an explicit annotation or surrounding type context.)
- **When use `iter_mut()`?** (Answer: When each element must be mutated in place without consuming the collection.)
