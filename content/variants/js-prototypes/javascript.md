---
id: variant.js-prototypes.javascript
question: question.js-prototypes
technology: tech.javascript
---
# Expected Answer

JavaScript uses **Prototypal Inheritance**. Every object has a hidden internal property (denoted as `[[Prototype]]`) that points to another object (its prototype). When you access a property that doesn't exist on an object, the engine searches the prototype, then the prototype's prototype, forming the **Prototype Chain**, until it hits `null`.

When using a constructor function with `new`, the new object's `[[Prototype]]` is automatically linked to the constructor's `.prototype` property.

# Why It Matters

Understanding prototypes is key to understanding how JavaScript handles memory and inheritance. Instead of every instance having its own copy of a method, methods are shared on the prototype, saving significant memory. It also explains how built-in features like `.map()` or `.filter()` work—they are methods defined on `Array.prototype`.

# Example Code

### The `new` Keyword Mechanism

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHi = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const dog = new Animal('Buddy');

// Steps during `new Animal('Buddy')`:
// 1. New object created: {}
// 2. Prototype linked: dog.__proto__ === Animal.prototype
// 3. `this` bound to new object: name = 'Buddy'
// 4. Object returned
```

# Common Mistakes

- **Confusing `__proto__` and `prototype`**: `prototype` is a property on constructor functions used to build the chain for *new instances*. `__proto__` (or `Object.getPrototypeOf`) is the actual link on an *instance* that points to its prototype.
- **Modifying Built-in Prototypes**: "Monkey patching" (e.g., `Array.prototype.myFunc = ...`) is dangerous as it can cause collisions with future JS versions or other libraries.

# Follow-up Questions

- **How does `Object.create(null)` differ from `{}`?** (Answer: It creates an object with no prototype at all—no `toString`, no `hasOwnProperty`, etc. Useful for clean maps/dictionaries).
- **Does the `class` syntax change how this works?** (Answer: No, `class` is mostly syntactic sugar over the same prototypal mechanism).

# References

- [MDN Web Docs: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [JavaScript.info: Prototypes, inheritance](https://javascript.info/prototypes)
