---
id: variant.interface-vs-type.typescript
question: question.interface-vs-type
technology: tech.typescript
---
# Expected Answer
- **Interfaces** are primarily for defining object shapes. They support **Declaration Merging** (defining the same interface multiple times merges them).
- **Type Aliases** can represent primitives, unions, tuples, and intersections. They do *not* support declaration merging.

# Common Mistakes
- Thinking `interface` is always better because it's "more OOP".
- Using `type` for everything without considering extensibility via merging.

# Follow-up Questions
- How do you implement an interface in a class?
- What are Mapped Types?
