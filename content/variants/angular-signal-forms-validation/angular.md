---
id: variant.angular-signal-forms-validation.angular
question: question.angular-signal-forms-validation
technology: tech.angular
---
# Expected Answer

**Signal Forms** (v22 Stable) provide a declarative way to handle validation. Instead of checking a form's status manually, you use signals to derive the validity of the form and its fields.

### 1. Simple Validation
Validators are passed during field creation.

```typescript
name = signalField('', { 
  validators: [Validators.required, Validators.minLength(3)] 
});
```

### 2. Cross-Field Validation
Use a `computed()` signal to combine the values of multiple fields and check their validity.

```typescript
password = signalField('');
confirm = signalField('');

// Declarative cross-field check
passwordsMatch = computed(() => this.password() === this.confirm());

form = signalForm({
  password: this.password,
  confirm: this.confirm
}, {
  validators: [() => this.passwordsMatch() ? null : { mismatch: true }]
});
```

### 3. Async Validation
Signal Forms handle async validators by returning an observable or promise that emits validation errors.

```typescript
username = signalField('', {
  asyncValidators: [val => this.api.checkUsername(val)]
});

// In template:
@if (username.pending()) { <spinner /> }
@if (username.errors().taken) { <p>Already in use</p> }
```

# Why It Matters

Signal-based validation is **synchronous and reactive**. You don't have to subscribe to `statusChanges` to know when a form becomes valid. This makes the UI code much cleaner—you can bind a button's `disabled` attribute directly to a computed signal or the form's `.invalid()` signal. The fine-grained nature of signals also means that validation for one field won't trigger unnecessary re-renders for the rest of the form.

# Common Mistakes

- **Imperative Checks:** Trying to check `if (this.form.valid)` inside a submit method instead of binding the UI to the `.valid()` signal.
- **Forgetting `.pending()`:** With async validators, the form might be neither valid nor invalid for a short time. You must check the `.pending()` signal to show appropriate loading states.
- **Over-validating:** Creating expensive computed signals for validation that could be handled by a simple built-in validator.

# Follow-up Questions

- **Can I use my old Reactive Forms validators?** (Answer: Yes, Signal Forms are compatible with standard `ValidatorFn` functions).
- **How do I show errors only after the user has touched the field?** (Answer: Use the `.touched()` or `.dirty()` signals: `computed(() => this.name.invalid() && this.name.touched())`).
- **How do you reset validation?** (Answer: Calling `form.reset()` clears both the values and the validation states (touched/dirty/errors)).

# References

- [Angular Docs: Signal Forms Validation](https://angular.dev/guide/forms/signal-forms#validation)
- [Angular Blog: Modern Forms in v22](https://blog.angular.io/angular-v22-is-here)

