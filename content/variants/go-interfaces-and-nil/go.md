---
id: variant.go-interfaces-and-nil.go
question: question.go-interfaces-and-nil
technology: tech.go
---
# Expected Answer (Go 1.26.5)

Go interfaces are satisfied implicitly: a type implements an interface when its method set contains the interface's methods. An interface value is conceptually a pair of dynamic type and dynamic value. It is only equal to `nil` when both are absent.

Assigning a typed nil pointer to an interface supplies a dynamic type, so the interface is non-nil even though its dynamic value is nil.

```go
package main

import "fmt"

type Notifier interface {
	Notify()
}

type EmailNotifier struct{}

func (*EmailNotifier) Notify() {}

func main() {
	var email *EmailNotifier
	var notifier Notifier = email

	fmt.Println(email == nil)    // true
	fmt.Println(notifier == nil) // false
}
```

Avoid returning typed nil pointers as `error` or interface values when callers expect a nil interface to represent success. Return a literal `nil` interface on success instead.

# Why It Matters

This pitfall is especially dangerous for error returns: `if err != nil` can enter an error path even though the underlying pointer is nil. Interfaces also shape how Go code is tested and decoupled from concrete implementations.

# Common Mistakes

- **Expecting explicit `implements` declarations:** Go uses structural, implicit interface satisfaction.
- **Returning a typed nil pointer as an `error`:** The resulting interface is non-nil.
- **Ignoring receiver type:** Methods with pointer receivers are not in the method set of the non-pointer value type.

# Follow-up Questions

- **Why are small interfaces preferred in Go?** (Answer: They are easier to satisfy, mock, and keep focused on a caller's actual needs.)
- **How can you check a dynamic interface type?** (Answer: Use a type assertion or a type switch.)
