---
id: variant.rust-modules-and-visibility.rust
question: question.rust-modules-and-visibility
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

A crate is a compilation unit, such as a binary or library. Modules create a hierarchy of names inside a crate and provide privacy boundaries. Items are private to their parent module by default, so a public API must be intentionally exposed with `pub` or a narrower visibility modifier such as `pub(crate)`.

`use` creates a convenient local name for a path; it does not itself grant access or make an item public.

```rust
mod billing {
    pub struct Invoice {
        id: u64,
    }

    impl Invoice {
        pub fn new(id: u64) -> Self {
            Self { id }
        }

        pub fn id(&self) -> u64 {
            self.id
        }
    }
}

fn main() {
    let invoice = billing::Invoice::new(42);
    assert_eq!(invoice.id(), 42);
}
```

External code can construct `Invoice` only through its public constructor; its field remains encapsulated.

# Why It Matters

Intentional visibility keeps a crate's public contract small, enables internal refactoring, and prevents consumers from depending on implementation details. It also makes ownership and invariants easier to protect.

# Common Mistakes

- **Making fields public to avoid writing methods:** This exposes representation details and makes future changes harder.
- **Assuming `use` changes access control:** It only imports a name into the current scope.
- **Using `pub` for every internal helper:** Prefer the narrowest visibility that satisfies the required callers.

# Follow-up Questions

- **What does `pub(crate)` mean?** (Answer: The item is visible anywhere within the current crate but not to external crates.)
- **How can a child module access a private parent item?** (Answer: Privacy is defined relative to parent modules, so a child can access items visible to its parent.)
