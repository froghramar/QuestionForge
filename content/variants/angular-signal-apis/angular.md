---
id: variant.angular-signal-apis.angular
question: question.angular-signal-apis
technology: tech.angular
---
# Expected Answer

Modern Angular (v17.2+) replaces the class decorators `@Input` and `@Output` with **Signal-based APIs**: `input()`, `output()`, and `model()`.

### The Key Primitives:

1.  **`input()`**: Creates a read-only Signal representing an input.
    - **Old:** `@Input() user: User;`
    - **New:** `user = input<User>();` (or `input.required<User>()`)
2.  **`output()`**: A cleaner, non-signal way to emit events. It replaces `EventEmitter`.
    - **Old:** `@Output() saved = new EventEmitter<void>();`
    - **New:** `saved = output<void>();`
3.  **`model()`**: A special signal that supports two-way binding.
    - **New:** `checked = model(false);` (Allows the parent to use `[(checked)]="val"`).

### Comparison:

| Feature | Decorators (@Input) | Signal Inputs (input()) |
| :--- | :--- | :--- |
| **Type Safety** | Moderate (hacks for required) | Excellent (`input.required`) |
| **Reactivity** | Manual (`ngOnChanges`) | Automatic (via `computed`) |
| **Transformations** | `transform` option | Native via `computed` |
| **Two-Way Binding** | Complex (Input + Output) | Simple (`model()`) |

# Why It Matters

Signal inputs are a huge win for code quality. Because they are Signals, you can derive state from them using `computed()` without needing `ngOnChanges`. For example, if you have a `firstName` and `lastName` input, you can simply create a `fullName = computed(() => this.firstName() + ' ' + this.lastName())`. This logic is declarative, synchronous, and automatically updates whenever either input changes.

# Example Code

```typescript
@Component({
  standalone: true,
  template: `
    <p>User: {{ fullName() }}</p>
    <button (click)="notify()">Notify</button>
  `
})
export class UserDisplay {
  // Signal-based inputs
  firstName = input.required<string>();
  lastName = input.required<string>();

  // Derived state (automatic reactivity)
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  // Signal-based output
  onNotify = output<string>();

  notify() {
    this.onNotify.emit(this.fullName());
  }
}
```

# Common Mistakes

- **Trying to mutate an `input()`:** Inputs are read-only signals. If you need a value that can be changed by the component and synced back to the parent, use `model()`.
- **Forgetting the parens in templates:** Like all signals, you must call them: `{{ user() }}` not `{{ user }}`.
- **Using `ngOnChanges` with signal inputs:** While it still works, it's an anti-pattern. You should use `computed()` for derived state or `effect()` for side effects.

# Follow-up Questions

- **What is the `transform` property in `input()`?** (Answer: It's a function that allows you to pre-process the raw value passed from the parent, such as converting a string to a number or a boolean).
- **How does `model()` simplify communication?** (Answer: It removes the need for a separate `@Output` with the `Change` suffix; the single `model()` handles both).
- **Can I use signal inputs in a non-standalone component?** (Answer: Yes, they are compatible with both standalone and module-based components).

# References

- [Angular Docs: Signal Inputs](https://angular.dev/guide/signals/inputs)
- [Angular Docs: Model Inputs](https://angular.dev/guide/signals/model-inputs)
- [Angular Docs: Outputs](https://angular.dev/guide/components/outputs)

