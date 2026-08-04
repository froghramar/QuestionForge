---
id: variant.rust-ownership-and-borrowing.rust
question: question.rust-ownership-and-borrowing
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

Rust gives every value one owner. When ownership moves, the previous binding can no longer be used; this prevents two owners from freeing the same resource. Borrowing with references lets code access a value without transferring ownership.

The borrowing rules allow any number of immutable references or exactly one mutable reference at a time. The compiler enforces these rules so references cannot outlive the data they point to and mutation cannot race with observation.

```rust
fn append_status(message: &mut String) {
    message.push_str(": ready");
}

fn main() {
    let mut message = String::from("service");
    append_status(&mut message);

    let view = &message;
    println!("{view}");
}
```

`String` is moved by assignment unless explicitly borrowed or cloned, while simple scalar types such as `u32` implement `Copy` and are copied instead.

# Why It Matters

Ownership lets Rust prevent use-after-free, double-free, and many data races at compile time. Understanding it is essential for designing APIs that avoid needless cloning while keeping data access safe.

# Common Mistakes

- **Treating a move as a deep copy:** A moved non-`Copy` value transfers ownership; use `clone` only when an independent value is needed.
- **Holding an immutable borrow across a mutation:** The immutable reference must no longer be in use before a mutable borrow can begin.
- **Using lifetimes to extend data lifetime:** Lifetimes describe and check existing relationships; they do not make a value live longer.

# Follow-up Questions

- **What does `Copy` change?** (Answer: Assignment and passing duplicate the value instead of moving it.)
- **Why can Rust allow multiple immutable references?** (Answer: None of them can mutate the value, so they cannot conflict.)
