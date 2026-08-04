---
id: variant.go-data-races.go
question: question.go-data-races
technology: tech.go
---
# Expected Answer (Go 1.26.5)

A data race occurs when two or more goroutines access the same memory concurrently, at least one access writes, and there is no synchronization establishing a safe ordering. Races make program behavior undefined from the application's perspective and can produce intermittent wrong results.

Use a mutex for simple shared mutable state, channels when ownership transfer or workflow coordination is clearer, and atomics for carefully designed low-level counters or flags. Use the race detector during development and tests, but do not treat a clean run as a proof that no race exists.

```go
package main

import (
	"sync"
)

type Counter struct {
	mu    sync.Mutex
	value int
}

func (counter *Counter) Increment() {
	counter.mu.Lock()
	defer counter.mu.Unlock()
	counter.value++
}

func (counter *Counter) Value() int {
	counter.mu.Lock()
	defer counter.mu.Unlock()
	return counter.value
}
```

Run `go test -race ./...` to instrument tests for race detection.

# Why It Matters

Races can corrupt state, cause security problems, and fail only under production timing. A clear synchronization strategy gives services predictable behavior under concurrent load.

# Common Mistakes

- **Protecting writes but not reads:** A read concurrent with a write is still a data race.
- **Copying a `sync.Mutex` after first use:** Copies do not coordinate with the original lock and can break protection.
- **Assuming the race detector finds every possible race:** It observes only execution paths that actually run.

# Follow-up Questions

- **What is a common use for `sync.RWMutex`?** (Answer: Shared data with many concurrent readers and comparatively infrequent writers.)
- **Does preventing data races prevent deadlocks?** (Answer: No; locks can still be acquired in conflicting orders.)
