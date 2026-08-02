---
id: variant.angular-signal-forms.angular
question: question.angular-signal-forms
technology: tech.angular
---
# Expected Answer

**Signal Forms** (stabilized in Angular 22) represent the modern way to handle user input in Angular, succeeding the legacy **Reactive Forms** (`FormGroup`/`FormControl`).

### Key Differences:

1.  **Reactivity Model:** Reactive Forms rely on `ValueChanges` observables. Signal Forms use **Signals**, which provide synchronous, fine-grained updates and automatic dependency tracking.
2.  **Type Safety:** Signal Forms are built from the ground up with TypeScript's modern type system, offering much better inference for nested form structures than the retrofitted types in Reactive Forms.
3.  **Validation:** Validation in Signal Forms is often more declarative, using computed signals to derive the valid/invalid state of the form or specific fields.
4.  **Boilerplate:** Signal Forms typically require less code to set up and bind to templates compared to the verbose `FormBuilder` approach.

### Example Code (Signal Forms):

```typescript
@Component({
  standalone: true,
  template: `
    <input [formField]="name" />
    @if (name.errors().required) { <small>Required!</small> }
    <button [disabled]="loginForm.invalid()">Submit</button>
  `
})
export class LoginComponent {
  name = signalField('', { validators: [Validators.required] });
  loginForm = signalForm({ name: this.name });

  submit() {
    if (this.loginForm.valid()) {
      console.log(this.loginForm.value());
    }
  }
}
```

# Why It Matters

Signal Forms align perfectly with the "Signal-first" era of Angular (v22+). They eliminate the overhead of RxJS for simple form state and integrate seamlessly with `ChangeDetectionStrategy.OnPush` (the default in v22). This leads to better runtime performance and a more consistent developer experience across the framework.

# Common Mistakes

- **Mixing RxJS logic with Signal Forms unnecessarily:** While `toObservable` exists, the goal of Signal Forms is to minimize reliance on Observables for local UI state.
- **Forgetting to call the signal in the template:** Just like standard signals, you access form values or error states by calling them: `myForm.value()`.
- **Assuming full feature parity in early migration:** While stable, some niche features of complex Reactive Forms might require slightly different patterns in Signal Forms.

# Follow-up Questions

- **Can I use Signal Forms and Reactive Forms in the same app?** (Answer: Yes, they are independent packages, though it's best to standardize on one for consistency).
- **How does validation differ?** (Answer: Signal Forms use signals for error states, allowing you to use `computed()` to derive complex validation states effortlessly).
- **Is `FormBuilder` still relevant?** (Answer: In v22, `signalForm` serves a similar purpose but with a cleaner, signal-based API).

# References

- [Angular Docs: Signal Forms Guide](https://angular.dev/guide/forms/signal-forms)
- [Angular Blog: What's new in v22](https://blog.angular.io/angular-v22-is-here)

