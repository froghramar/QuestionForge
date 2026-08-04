---
id: variant.go-maps.go
question: question.go-maps
technology: tech.go
---
# Expected Answer (Go 1.26.5)

Map keys must be comparable. Reading a missing key is safe and produces the zero value of the value type, so use the comma-ok form when zero could also be a legitimate stored value. A nil map can be read and ranged over, but assigning to one panics.

Regular maps are not safe for concurrent access when a write is involved. Protect shared maps with synchronization, arrange single-goroutine ownership, or choose a suitable concurrent design.

```go
package main

import "fmt"

func main() {
	counts := map[string]int{"ready": 0}

	value, ok := counts["ready"]
	fmt.Println(value, ok) // 0 true

	value, ok = counts["missing"]
	fmt.Println(value, ok) // 0 false

	delete(counts, "ready") // Safe even if the key is absent.
}
```

# Why It Matters

Presence checks avoid confusing "absent" with meaningful zero values such as a count of zero or a disabled feature. Correct map ownership prevents runtime failures and data races in concurrent services.

# Common Mistakes

- **Checking only the returned value for presence:** A missing key and an explicit zero value are indistinguishable without `ok`.
- **Writing to a nil map:** Initialize it with `make` or a map literal before assignment.
- **Using a map from multiple goroutines without synchronization:** Concurrent access involving writes is unsafe.

# Follow-up Questions

- **Can a slice be used as a map key?** (Answer: No, slices are not comparable.)
- **What does `delete` do for a missing key?** (Answer: Nothing; it is safe.)
