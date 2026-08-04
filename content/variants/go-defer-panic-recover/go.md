---
id: variant.go-defer-panic-recover.go
question: question.go-defer-panic-recover
technology: tech.go
---
# Expected Answer (Go 1.26.5)

`defer` schedules a call to run when the current function exits, whether it exits normally or while a panic unwinds. Multiple deferred calls run in reverse order. The arguments in `defer f(x)` are evaluated immediately, whereas a deferred closure can read a later value of an outer variable.

`panic` is for unrecoverable or violated-invariant situations, not routine failures that should be returned as `error`. `recover` can stop a panic only when it is called directly by a deferred function in the same goroutine.

```go
package main

import "fmt"

func safeDivide(a, b int) (result int, err error) {
	defer func() {
		if value := recover(); value != nil {
			err = fmt.Errorf("divide failed: %v", value)
		}
	}()

	if b == 0 {
		panic("zero divisor")
	}
	return a / b, nil
}

func main() {
	_, err := safeDivide(10, 0)
	fmt.Println(err)
}
```

Recovery is usually reserved for a narrow boundary, such as preventing a server handler from crashing the whole process, where the program can log and report a controlled failure.

# Why It Matters

Using `defer` correctly prevents leaked files, locks, and spans. Keeping panics exceptional retains clear error contracts and prevents recovery from concealing programmer defects.

# Common Mistakes

- **Using panic instead of returning expected validation or I/O errors:** This makes normal control flow hard for callers to handle.
- **Expecting `recover` in one goroutine to catch another's panic:** Panics are isolated to the goroutine where they occur.
- **Assuming deferred arguments see later variable changes:** Non-closure arguments are evaluated at the `defer` statement.

# Follow-up Questions

- **In what order do multiple deferred calls run?** (Answer: Last-in-first-out.)
- **Why might a named return value be used with a deferred function?** (Answer: The deferred function can inspect or modify the named result before the function returns.)
