---
id: variant.rust-smart-pointers.rust
question: question.rust-smart-pointers
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

`Box<T>` gives one owner heap allocation and is useful for recursive types or large values. `Rc<T>` gives multiple owners through non-atomic reference counting for single-threaded code. `Arc<T>` uses atomic reference counting for shared ownership across threads. These pointers manage ownership; mutability still follows Rust's borrowing rules.

Interior mutability moves some borrow checking to runtime. For example, `RefCell<T>` allows mutation through a shared reference in single-threaded code, but it panics if mutable and conflicting borrows overlap. For cross-thread mutation, combine `Arc<T>` with a synchronization primitive such as `Mutex<T>`.

```rust
use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let total = Rc::new(RefCell::new(0));
    let another_owner = Rc::clone(&total);

    *another_owner.borrow_mut() += 1;
    assert_eq!(*total.borrow(), 1);
}
```

# Why It Matters

Choosing the right pointer makes ownership constraints explicit and avoids unnecessary cloning or unsafe shared state. It is essential for data structures, callback graphs, caches, and concurrent services.

# Common Mistakes

- **Using `Rc` across threads:** It is not thread-safe; use `Arc` when ownership is shared across threads.
- **Assuming `RefCell` removes borrowing rules:** It enforces them at runtime and panics on violations.
- **Using `Arc` alone for mutation:** It shares ownership but does not make inner mutable data safe; add synchronization when required.

# Follow-up Questions

- **When is `Box<T>` useful for a recursive enum?** (Answer: It gives the recursive field a known pointer size.)
- **How does `Mutex<T>` differ from `RefCell<T>`?** (Answer: A mutex synchronizes across threads; `RefCell` is for single-threaded runtime borrowing.)
