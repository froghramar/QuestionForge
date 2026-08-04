---
id: variant.go-goroutines-and-channels.go
question: question.go-goroutines-and-channels
technology: tech.go
---
# Expected Answer (Go 1.26.5)

A goroutine is a lightweight concurrent function managed by the Go runtime, not a one-to-one operating-system thread. Channels communicate typed values between goroutines. An unbuffered channel send waits for a receiver, while a buffered channel send waits only when its buffer is full.

The sending side should generally close a channel, and only when it is certain no further sends will occur. Receivers should use cancellation to stop work when a caller no longer needs the result.

```go
package main

import (
	"context"
	"fmt"
)

func produce(ctx context.Context, values chan<- int) {
	defer close(values)
	for i := 1; i <= 3; i++ {
		select {
		case values <- i:
		case <-ctx.Done():
			return
		}
	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	values := make(chan int)
	go produce(ctx, values)
	for value := range values {
		fmt.Println(value)
	}
}
```

# Why It Matters

Services commonly fan work out to goroutines for requests, background jobs, and I/O. Without clear ownership, cancellation, and channel lifecycles, they can deadlock, leak resources, or overwhelm downstream systems.

# Common Mistakes

- **Closing a channel from the receiving side:** A concurrent sender can panic by sending on the closed channel.
- **Assuming a goroutine automatically stops when its caller returns:** It continues until it returns or is otherwise coordinated.
- **Using an unbounded goroutine per input item:** High load can exhaust memory or downstream capacity; bound concurrency.

# Follow-up Questions

- **What does receiving from a closed channel return?** (Answer: Remaining buffered values, then the zero value with `ok` set to false.)
- **When is a mutex preferable to a channel?** (Answer: When protecting shared state is simpler than transferring ownership or coordinating a workflow.)
