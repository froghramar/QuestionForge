---
id: variant.dotnet-disposal.rust
question: question.dotnet-disposal
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

Rust applies RAII: a resource is acquired by an owning value and released when that value is dropped. When an owned local leaves scope, Rust calls its destructor deterministically. A type can implement `Drop` for cleanup such as closing a file, returning a connection, or releasing a lock.

To release a resource earlier, pass it to `std::mem::drop`. Rust prevents directly calling `Drop::drop`, which would otherwise risk running cleanup twice when the value later leaves scope.

```rust
struct AuditGuard(&'static str);

impl Drop for AuditGuard {
    fn drop(&mut self) {
        println!("released {}", self.0);
    }
}

fn main() {
    let guard = AuditGuard("connection");
    println!("using connection");
    std::mem::drop(guard);
    println!("connection is already released");
}
```

Ownership moves transfer cleanup responsibility to the new owner, so a value is cleaned up exactly once unless intentionally leaked through specialized APIs.

# Why It Matters

RAII prevents resource leaks across early returns and error paths without requiring a garbage collector. It is the foundation of safe files, locks, transactions, and scoped guards in Rust.

# Common Mistakes

- **Expecting a value to be dropped immediately after its last use:** The compiler may keep it alive to the end of scope; call `std::mem::drop` when early release is required.
- **Calling `Drop::drop` directly:** Rust disallows this because the value would be dropped again later.
- **Performing fallible work in `Drop`:** Cleanup cannot return an error to the caller, so critical fallible work should use an explicit method first.

# Follow-up Questions

- **In what order are local variables dropped?** (Answer: Reverse order of their creation.)
- **Why are mutex guards often bound to a local variable?** (Answer: The guard releases the lock automatically when it is dropped.)
