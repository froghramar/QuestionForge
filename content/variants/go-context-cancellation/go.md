---
id: variant.go-context-cancellation.go
question: question.go-context-cancellation
technology: tech.go
---
# Expected Answer (Go 1.26.5)

`context.Context` propagates cancellation, deadlines, and request-scoped metadata across API boundaries. A function should accept it as its first parameter and regularly select on `ctx.Done()` when performing work that can be stopped. Derive contexts with `WithCancel` or `WithTimeout`, and call the returned cancel function even when the timeout will eventually fire.

Context values are for request-scoped cross-cutting metadata such as a trace ID, not optional function parameters or general application state.

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func waitForWork(ctx context.Context) error {
	select {
	case <-time.After(time.Second):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Millisecond)
	defer cancel()

	fmt.Println(waitForWork(ctx)) // context deadline exceeded
}
```

# Why It Matters

Cancellation prevents abandoned HTTP requests and background jobs from continuing to consume connections, CPU, and memory. Correct propagation improves service latency and keeps shutdown behavior predictable.

# Common Mistakes

- **Creating a new `context.Background()` inside a request path:** This discards the caller's deadline and cancellation signal.
- **Forgetting to call `cancel`:** Resources associated with a derived context can remain until its parent ends or its timeout fires.
- **Using context values for required dependencies:** It hides the function's real API and weakens type safety.

# Follow-up Questions

- **What does `ctx.Err()` return after a timeout?** (Answer: `context.DeadlineExceeded`.)
- **How should an HTTP handler obtain its context?** (Answer: From `r.Context()`, then pass it to downstream calls.)
