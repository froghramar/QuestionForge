---
id: variant.rust-traits-and-dispatch.rust
question: question.rust-traits-and-dispatch
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

A trait specifies behavior that multiple types can implement. A generic function with a trait bound uses static dispatch in typical cases: the compiler generates specialized code for each concrete type. This is fast and preserves concrete types, but can increase generated code size.

A trait object such as `&dyn Describe` uses dynamic dispatch, allowing heterogeneous values behind one interface at runtime. It adds indirection and requires an object-safe trait, but is useful when the concrete type is not known until runtime.

```rust
trait Describe {
    fn describe(&self) -> String;
}

struct User {
    name: String,
}

impl Describe for User {
    fn describe(&self) -> String {
        format!("user: {}", self.name)
    }
}

fn print_description(value: &dyn Describe) {
    println!("{}", value.describe());
}

fn main() {
    let user = User { name: String::from("Ada") };
    print_description(&user);
}
```

# Why It Matters

Traits enable reusable, testable Rust APIs without inheritance hierarchies. Choosing the dispatch model deliberately avoids needless heap allocation or dynamic indirection while supporting extensibility when it is genuinely required.

# Common Mistakes

- **Assuming all traits can become `dyn Trait`:** Methods involving `Self` or generic type parameters can make a trait non-object-safe.
- **Using trait objects by default:** Generic bounds are often simpler and faster when all types are known at compile time.
- **Treating a trait implementation as inheritance:** Traits share behavior contracts; they do not provide inherited instance fields.

# Follow-up Questions

- **What does `impl Trait` in an argument position mean?** (Answer: It is shorthand for a generic type parameter with that trait bound.)
- **When is dynamic dispatch useful?** (Answer: When a collection or API must handle different concrete implementations selected at runtime.)
