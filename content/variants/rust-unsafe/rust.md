---
id: variant.rust-unsafe.rust
question: question.rust-unsafe
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

`unsafe` allows a small set of operations that the compiler cannot prove safe, including dereferencing raw pointers and calling unsafe functions. It does not disable ordinary checks, erase ownership, or make arbitrary code safe. The developer must ensure the specific unsafe operation satisfies its required invariants.

Keep unsafe blocks as small as possible, explain why the operation is valid, and build a safe API that prevents callers from violating the assumptions. Mark a function `unsafe` when the caller must uphold a safety precondition that the function cannot verify itself.

```rust
fn first_byte(bytes: &[u8]) -> Option<u8> {
    if bytes.is_empty() {
        return None;
    }

    // Safety: the emptiness check proves index 0 is in bounds, and `bytes`
    // remains valid for the duration of this access.
    Some(unsafe { *bytes.get_unchecked(0) })
}

fn main() {
    assert_eq!(first_byte(b"rust"), Some(b'r'));
    assert_eq!(first_byte(b""), None);
}
```

In normal application code, the checked `bytes.first().copied()` is clearer and preferred. Unsafe code is justified only when a measured need exists and its invariants are demonstrably maintained.

# Why It Matters

Unsafe code underpins performance-sensitive libraries and FFI while retaining a clear boundary for manual reasoning. A single unsound unsafe abstraction can make otherwise safe callers trigger undefined behavior.

# Common Mistakes

- **Using unsafe to silence a borrow-checker error:** The compiler error often identifies a real aliasing or lifetime problem that must be redesigned.
- **Writing a large undocumented unsafe block:** It makes the required invariants difficult to audit and maintain.
- **Marking a function safe when callers must satisfy a precondition:** This lets safe callers create undefined behavior through an unsound API.

# Follow-up Questions

- **What is an example of a caller safety precondition?** (Answer: A raw pointer must be non-null, properly aligned, valid for the accessed range, and meet aliasing requirements.)
- **Why should an unsafe wrapper expose a safe interface where possible?** (Answer: It centralizes the proof once and prevents each caller from having to uphold unsafe invariants.)
