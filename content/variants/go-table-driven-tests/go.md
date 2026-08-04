---
id: variant.go-table-driven-tests.go
question: question.go-table-driven-tests
technology: tech.go
---
# Expected Answer (Go 1.26.5)

A table-driven test represents cases as data and uses one shared test body to execute and assert them. Naming each case and wrapping it in `t.Run` gives clear failure output and allows cases to be selected individually. It is a convention, not a special language feature.

```go
package word

import "testing"

func TestIsPalindrome(t *testing.T) {
	tests := []struct {
		name string
		input string
		want  bool
	}{
		{name: "palindrome", input: "level", want: true},
		{name: "ordinary word", input: "gopher", want: false},
		{name: "empty", input: "", want: true},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := IsPalindrome(test.input); got != test.want {
				t.Errorf("IsPalindrome(%q) = %v, want %v", test.input, got, test.want)
			}
		})
	}
}
```

Use `t.Errorf` when a case can continue collecting assertions and `t.Fatalf` when the rest of that subtest cannot proceed. Run `go test ./...` for the package tree and add `-race` for concurrent code.

# Why It Matters

Table-driven tests make boundary cases and error behavior visible without repeated setup. Clear case names shorten debugging time and make test suites easier to extend safely.

# Common Mistakes

- **Using unnamed cases:** A failure then gives little clue about the input that failed.
- **Sharing mutable setup between cases unintentionally:** One case can affect another and make tests order-dependent.
- **Calling `t.Fatal` from a goroutine:** Only the test goroutine should call fatal test methods; communicate errors back instead.

# Follow-up Questions

- **What command runs all package tests?** (Answer: `go test ./...`.)
- **When should a test use `t.Helper()`?** (Answer: In an assertion helper so failure locations point to its caller.)
