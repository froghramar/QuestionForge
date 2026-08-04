---
id: variant.go-struct-embedding.go
question: question.go-struct-embedding
technology: tech.go
---
# Expected Answer (Go 1.26.5)

Struct embedding is composition, not inheritance. An embedded type is an unnamed field inside the outer struct. Its eligible fields and methods are promoted, so callers can often use them through the outer value, but the embedded component remains a separate value and can be selected explicitly.

Embedding is useful for reuse, but it can unintentionally expose a broad API. Prefer explicit fields and delegation when the outer type should control what it exposes.

```go
package main

import "fmt"

type Logger struct{}

func (Logger) Log(message string) {
	fmt.Println(message)
}

type Service struct {
	Logger // Embedded field.
	Name string
}

func main() {
	service := Service{Name: "billing"}
	service.Log("started")        // Promoted method.
	service.Logger.Log("stopped") // Explicit component selection.
}
```

# Why It Matters

Embedding can keep small Go types concise, but unclear promotion can make APIs fragile as dependencies evolve. Understanding it leads to better composition boundaries and fewer method-name collisions.

# Common Mistakes

- **Treating embedding as subclassing:** The outer type does not become a subtype of the embedded concrete type.
- **Forgetting that promoted methods can be shadowed:** A method defined on the outer type with the same name takes precedence.
- **Embedding a dependency just to avoid writing a forwarding method:** This may expose methods that are not part of the intended API.

# Follow-up Questions

- **How are ambiguous promoted method names handled?** (Answer: They cannot be selected through the outer type; select the intended embedded field explicitly.)
- **When might pointer embedding be appropriate?** (Answer: When the outer type should share and possibly mutate one referenced component or needs its pointer-receiver methods.)
