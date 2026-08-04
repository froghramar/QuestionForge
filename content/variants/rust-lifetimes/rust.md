---
id: variant.rust-lifetimes.rust
question: question.rust-lifetimes
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

Lifetimes are compile-time annotations that describe relationships between references. They do not make data live longer; they let the borrow checker verify that every reference remains valid. Rust infers lifetimes in many common signatures, but an explicit parameter is needed when the returned reference might originate from more than one input reference.

In this signature, the returned reference is valid no longer than the shorter-lived of `left` and `right`:

```rust
fn longer<'a>(left: &'a str, right: &'a str) -> &'a str {
    if left.len() >= right.len() {
        left
    } else {
        right
    }
}

fn main() {
    let result = longer("alpha", "beta");
    assert_eq!(result, "alpha");
}
```

The annotation says the input references and output reference share a validity relationship. It does not require them to have exactly the same concrete duration.

# Why It Matters

Lifetimes make APIs that return borrowed data safe without garbage collection. Understanding them helps you design clear ownership boundaries and recognize when returning an owned value is simpler than forcing a complex borrowed relationship.

# Common Mistakes

- **Thinking `'a` is a runtime timer:** Lifetimes exist for compile-time checking and are normally erased from generated code.
- **Adding annotations to fix an invalid reference:** An annotation cannot make a reference to dropped local data valid.
- **Assuming all lifetimes must be written explicitly:** The compiler elides many common cases.

# Follow-up Questions

- **Why can't a function return `&local_string`?** (Answer: The local string is dropped when the function returns, leaving a dangling reference.)
- **When might returning `String` be better than `&str`?** (Answer: When the result must outlive the inputs or ownership is simpler for callers.)
