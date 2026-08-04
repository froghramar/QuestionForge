---
id: variant.go-slices.go
question: question.go-slices
technology: tech.go
---
# Expected Answer (Go 1.26.5)

A slice is a view onto an underlying array. It stores a pointer to that array, its current length, and its capacity. Copying a slice variable copies only this header, so writes through either slice can affect shared elements.

`append` may reuse the backing array if there is spare capacity; otherwise it allocates a new array and returns a slice pointing to it. Do not rely on a particular capacity-growth policy. Copy data explicitly before mutating it when the caller must retain independent ownership.

```go
package main

import "fmt"

func main() {
	values := []int{1, 2, 3, 4}
	left := values[:2]
	right := values[2:]

	left[1] = 20
	fmt.Println(values) // [1 20 3 4]
	fmt.Println(right)  // [3 4]

	clone := append([]int(nil), values...)
	clone[0] = 99
	fmt.Println(values[0]) // 1
}
```

# Why It Matters

Shared backing arrays can accidentally mutate request data or expose more memory than intended when a small subslice keeps a large buffer alive. Explicit copying makes API ownership and isolation clear.

# Common Mistakes

- **Assuming `sliceA = sliceB` copies elements:** It copies the slice header and usually shares storage.
- **Assuming every `append` creates a new array:** It may overwrite positions in the existing backing array when capacity remains.
- **Returning a tiny subslice of a huge buffer unnecessarily:** The whole backing array can stay reachable and consume memory.

# Follow-up Questions

- **How do nil and empty slices differ?** (Answer: Both have length zero and can be ranged over; a nil slice compares equal to nil, while an empty allocated slice does not.)
- **How do you limit append from modifying a parent slice?** (Answer: Use a full slice expression such as `part := values[:n:n]` to cap its capacity.)
