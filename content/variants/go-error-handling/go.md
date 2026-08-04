---
id: variant.go-error-handling.go
question: question.go-error-handling
technology: tech.go
---
# Expected Answer (Go 1.26.5)

Go represents expected failures as explicit `error` values. A function returns `nil` for its error result on success. Callers should handle an error where they have enough context to recover, translate it, or return it with useful context.

Wrap an underlying error with `%w` and inspect the chain with `errors.Is` for a known sentinel or `errors.As` for a specific error type. Do not compare `err.Error()` text because messages can change and wrapping adds context.

```go
package main

import (
	"errors"
	"fmt"
	"os"
)

func readConfig(path string) error {
	_, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("read config %q: %w", path, err)
	}
	return nil
}

func main() {
	err := readConfig("missing.json")
	if errors.Is(err, os.ErrNotExist) {
		fmt.Println("configuration file is missing")
	}
}
```

# Why It Matters

Error chains preserve both the low-level cause and the high-level operation that failed. That makes failures actionable for callers and diagnosable in logs without coupling behavior to unstable strings.

# Common Mistakes

- **Discarding an error with `_`:** This can hide data loss, failed cleanup, or an invalid result.
- **Adding context with `%v` instead of `%w`:** The message remains readable, but `errors.Is` and `errors.As` cannot traverse to the cause.
- **Comparing error messages:** String text is for people, not reliable program control flow.

# Follow-up Questions

- **When should an error be logged?** (Answer: Usually at the boundary where it is handled; logging every propagation level duplicates noise.)
- **What is `errors.As` for?** (Answer: It finds an error in the chain assignable to a target type.)
