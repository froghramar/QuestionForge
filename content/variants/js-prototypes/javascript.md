---
id: variant.js-prototypes.javascript
question: question.js-prototypes
technology: tech.javascript
---
# Expected Answer
JavaScript uses **Prototypal Inheritance**. Every object has a hidden property (usually denoted as `[[Prototype]]` or `__proto__`) that points to its prototype object. When accessing a property, if it's not found on the object itself, the engine searches the prototype, then the prototype's prototype, and so on, until it hits `null` (usually at `Object.prototype`).

### The `new` Keyword Mechanism
When you call `const instance = new Constructor()`, the following four steps occur:

1. **New Object Creation:** A brand new, empty object is created (`{}`).
2. **Prototype Linking:** The `[[Prototype]]` of this new object is linked to the `prototype` property of the `Constructor` function.
3. **Execution/Binding:** The `Constructor` function is executed with its `this` context bound to the new object.
4. **Return Result:** If the constructor returns an object, that object is returned. Otherwise, the new object created in step 1 is returned automatically.

# Common Mistakes
- **Confusing `__proto__` and `prototype`:** `prototype` is a property on functions (used when they act as constructors), while `__proto__` is a property on *all* objects (representing the actual chain).
- **Shadowing:** Unintentionally defining a property on an instance that exists on the prototype, hiding the prototype version.

# Follow-up Questions
- How does `Object.create(null)` differ from `{}`? (Answer: It has no prototype chain).
- Does the modern `class` syntax change this underlying mechanism? (Answer: No, it's mostly syntactic sugar over the same prototype chain).
