---
id: variant.angular-signals-vs-observables.angular
question: question.angular-signals-vs-observables
technology: tech.angular
---
# Expected Answer

**Signals** and **Observables** are both tools for reactivity in Angular, but they serve different purposes:

1.  **Signals** are best for **State Management**. They are synchronous, always have a value, and provide fine-grained reactivity. When a signal changes, Angular knows exactly which components (or parts of templates) need to be re-rendered without relying heavily on `Zone.js`.
2.  **Observables (RxJS)** are best for **Asynchronous Events and Streams**. They excel at handling HTTP requests, WebSockets, or complex user interactions that require operators like `debounceTime`, `switchMap`, or `catchError`.

### Key Differences:
- **Initial Value:** A Signal *must* have an initial value. An Observable does not.
- **Timing:** Signals are synchronous. Reading a signal always gives you the current value immediately. Observables can be synchronous or asynchronous.
- **Syntax:** Signals are accessed by calling them as functions: `mySignal()`. Observables are usually handled via the `async` pipe or `.subscribe()`.
- **Reactivity:** Signals are glitch-free (dependencies are tracked automatically). Observables require manual subscription management (or `async` pipe) and can lead to memory leaks if not handled correctly.

# Why It Matters

Using the right tool simplifies your code. Using RxJS for simple UI state (like a boolean flag) adds unnecessary complexity and boilerplate. Conversely, trying to use Signals for complex event coordination (like a search-as-you-type feature) is difficult because Signals lack the powerful temporal operators of RxJS. Modern Angular promotes a hybrid approach: use Signals for the UI state and RxJS for the data streams.

# Example Code

### Signal for UI State
```typescript
@Component({
  standalone: true,
  template: `
    <button (click)="increment()">Count: {{ count() }}</button>
    <p>Double: {{ doubleCount() }}</p>
  `
})
export class CounterComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}
```

### Observable for Data Fetching
```typescript
@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (data$ | async; as data) {
      <div>{{ data.name }}</div>
    }
  `
})
export class DataComponent {
  private http = inject(HttpClient);
  data$ = this.http.get<User>('/api/user');
}
```

# Common Mistakes

- **Replacing all RxJS with Signals:** Signals cannot handle complex asynchronous logic or events that occur over time as elegantly as RxJS.
- **Mutating Signals directly in templates:** You should trigger updates through methods in your component class to keep logic clean.
- **Forgetting to call the Signal:** Writing `{{ count }}` instead of `{{ count() }}` in the template will display the signal function reference rather than its value.
- **Overusing `toSignal`:** While useful for converting Observables to Signals for the template, overusing it can hide the underlying asynchronous nature of the data.

# Follow-up Questions

- **How do you convert an Observable to a Signal?** (Answer: Using the `toSignal()` utility function).
- **What is a "Glitch" in reactivity?** (Answer: An intermediate inconsistent state where some derived values have updated but others haven't. Signals are designed to be glitch-free).
- **Can you use RxJS operators with Signals?** (Answer: Not directly. You must convert the Signal to an Observable using `toObservable()` first).

# References

- [Angular Docs: Signals](https://angular.dev/guide/signals)
- [Angular Docs: RxJS Integration](https://angular.dev/guide/signals/rxjs-interop)
