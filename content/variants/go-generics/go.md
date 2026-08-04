---
id: variant.go-generics.go
question: question.go-generics
technology: tech.go
---
# Expected Answer (Go 1.26.5)

Generics let a function or type declare type parameters. A constraint specifies what type arguments are valid and which operations are available. Use `comparable` when values only need equality and map-key compatibility; define a richer constraint when an algorithm needs ordering or arithmetic.

The `~` operator permits named types whose underlying type matches. This lets an algorithm work with domain-specific aliases as well as the built-in type.

```go
package main

import "fmt"

type Ordered interface {
	~int | ~int64 | ~float64 | ~string
}

func max[T Ordered](left, right T) T {
	if left > right {
		return left
	}
	return right
}

type Score int

func main() {
	fmt.Println(max(3, 5))
	fmt.Println(max(Score(10), Score(7)))
}
```

# Why It Matters

Well-designed generics remove repetitive, error-prone implementations while keeping callers type-safe. Poorly designed constraints expose unnecessary implementation details and can obscure straightforward business logic.

# Common Mistakes

- **Using `any` when the algorithm needs operations:** `any` permits every type but does not allow comparison or arithmetic without further handling.
- **Assuming `comparable` supports ordering:** It supports `==` and `!=`, not `<` or `>`.
- **Generalizing code before a real repetition exists:** A concrete implementation is often clearer until shared behavior is proven.

# Follow-up Questions

- **What does `~string` allow?** (Answer: `string` and named types whose underlying type is `string`.)
- **When is an interface preferable to a type parameter?** (Answer: When behavior is best selected dynamically at runtime rather than specialized by type at compile time.)
