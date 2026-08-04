---
id: variant.rust-enums-and-pattern-matching.rust
question: question.rust-enums-and-pattern-matching
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

Rust enums define a value that is exactly one of several variants, and each variant can hold its own data. `match` requires all possibilities to be covered, so adding a new variant forces relevant handling sites to be reconsidered at compile time.

Use `if let` when only one pattern matters; choose `match` when every case should be handled explicitly or a value must be produced for each variant.

```rust
enum Payment {
    Card { last_four: String },
    BankTransfer { reference: String },
    Cash,
}

fn label(payment: &Payment) -> String {
    match payment {
        Payment::Card { last_four } => format!("card ending {last_four}"),
        Payment::BankTransfer { reference } => format!("transfer {reference}"),
        Payment::Cash => String::from("cash"),
    }
}

fn main() {
    let payment = Payment::Cash;
    assert_eq!(label(&payment), "cash");
}
```

# Why It Matters

Enums turn a set of meaningful states into a checked part of the type system. Exhaustive matching makes state-machine changes safer and reduces unhandled branches in business logic and protocol code.

# Common Mistakes

- **Using a wildcard arm too early:** It can hide newly added variants from important handling code.
- **Using multiple optional fields for mutually exclusive states:** An enum makes invalid combinations unrepresentable.
- **Moving data out of an enum when only inspection is needed:** Match on a reference to avoid consuming the value.

# Follow-up Questions

- **What is `Option<T>`?** (Answer: An enum with `Some(T)` and `None` variants.)
- **How can a match arm bind only part of a value?** (Answer: Use patterns such as `..` to ignore unneeded fields.)
