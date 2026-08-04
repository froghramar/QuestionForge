---
id: variant.go-method-receivers.go
question: question.go-method-receivers
technology: tech.go
---
# Expected Answer (Go 1.26.5)

A value receiver gets a copy, so changing its fields does not change the caller's value. A pointer receiver gets an address and can mutate the original. Use pointer receivers when mutation is required, copying is expensive or unsafe, or the type contains a mutex. Keep receiver style consistent for a type unless there is a clear reason not to.

Receiver choice affects interfaces: the method set of `T` includes value-receiver methods, while the method set of `*T` includes both value- and pointer-receiver methods.

```go
package main

import "fmt"

type Counter struct {
	value int
}

func (counter *Counter) Increment() {
	counter.value++
}

func (counter Counter) Value() int {
	return counter.value
}

func main() {
	counter := Counter{}
	counter.Increment() // The compiler takes the address of an addressable value.
	fmt.Println(counter.Value())
}
```

# Why It Matters

Using value receivers accidentally on stateful types produces changes that disappear. Correct receiver sets also prevent surprising interface-assignment failures and unsafe copies of locks.

# Common Mistakes

- **Using a value receiver for a mutation method:** The method changes only its local copy.
- **Expecting `T` to implement an interface requiring a pointer-receiver method:** Only `*T` has that method in its method set.
- **Copying a type after a mutex has been used:** The copied lock no longer synchronizes with the original.

# Follow-up Questions

- **Can an addressable value call a pointer receiver method?** (Answer: Yes, the compiler can take its address automatically.)
- **Why might a small immutable type use value receivers?** (Answer: Copies are cheap and the methods work naturally for both `T` and `*T`.)
