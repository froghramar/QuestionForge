---
id: variant.rust-send-and-sync.rust
question: question.rust-send-and-sync
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

`Send` means a value can be moved to another thread. `Sync` means it is safe for multiple threads to hold shared references to a value; equivalently, `&T` is `Send` when `T` is `Sync`. Rust derives these auto traits from a type's fields and rejects thread handoffs that would violate them.

For shared mutable state, `Arc` gives multiple threads ownership of the same allocation and `Mutex` ensures only one thread mutates the protected value at a time.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let total = Arc::new(Mutex::new(0));
    let worker_total = Arc::clone(&total);

    let worker = thread::spawn(move || {
        *worker_total.lock().unwrap() += 1;
    });

    worker.join().unwrap();
    assert_eq!(*total.lock().unwrap(), 1);
}
```

Avoid manually implementing `Send` or `Sync` with `unsafe` unless you can prove the type's invariants remain safe under all allowed cross-thread uses.

# Why It Matters

These traits let Rust reject many data-race-prone designs before code runs. Understanding them helps you choose safe synchronization primitives and diagnose compiler messages around threads and async runtimes.

# Common Mistakes

- **Equating `Send` with shared access:** `Send` transfers ownership; `Sync` governs shared references.
- **Using `Rc<RefCell<T>>` across threads:** Neither component provides the needed thread-safety guarantees.
- **Calling `unwrap` on a poisoned mutex without a policy:** Decide whether to recover, propagate, or terminate after a panic while holding the lock.

# Follow-up Questions

- **Why does `Arc` use atomic reference counting?** (Answer: Multiple threads may clone and drop ownership concurrently.)
- **What does a mutex protect?** (Answer: A critical section and the data accessed within it, so conflicting access is serialized.)
