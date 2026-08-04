---
id: variant.rust-error-handling.rust
question: question.rust-error-handling
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

Use `Result<T, E>` when an operation can fail and the caller should decide how to handle the failure. Use `Option<T>` when absence is an expected, ordinary outcome with no error detail needed. The `?` operator returns early with an error after applying the appropriate conversion, keeping propagation concise.

Avoid `unwrap` and `expect` for ordinary external failures because they panic. A panic is better reserved for an invariant that indicates a programming error or for a context where recovery is not meaningful.

```rust
use std::{fs, io};

fn first_line(path: &str) -> Result<Option<String>, io::Error> {
    let contents = fs::read_to_string(path)?;
    Ok(contents.lines().next().map(str::to_owned))
}

fn main() -> Result<(), io::Error> {
    if let Some(line) = first_line("config.txt")? {
        println!("{line}");
    }
    Ok(())
}
```

# Why It Matters

Typed error paths force callers to consider failure without exceptions being hidden in a function signature. Clear `Result` and `Option` APIs make error handling composable and keep ordinary absence distinct from operational failure.

# Common Mistakes

- **Using `Option` when callers need the failure reason:** The error information is lost; return `Result` instead.
- **Calling `unwrap` on user input or I/O:** An expected operational failure can terminate the process.
- **Using panic for validation errors:** Return a recoverable error so callers can respond appropriately.

# Follow-up Questions

- **What does `?` do on an `Err` value?** (Answer: It returns early from the enclosing function after converting the error if necessary.)
- **When might `expect` be reasonable?** (Answer: For an invariant that truly must hold, with a message that explains the violated assumption.)
