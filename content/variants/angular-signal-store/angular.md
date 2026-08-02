---
id: variant.angular-signal-store.angular
question: question.angular-signal-store
technology: tech.angular
---
# Expected Answer

**NgRx SignalStore** is a functional and type-safe state management solution designed specifically for Angular Signals. It provides a way to define state, derived values, and logic in a composable way.

### Comparison with Global NgRx (Redux):
- **Boilerplate:** SignalStore is much lighter; it doesn't require Actions, Reducers, or Selectors as separate boilerplate-heavy classes.
- **Reactivity:** It uses Signals directly, whereas Global NgRx uses RxJS Observables.
- **Scoping:** SignalStore can be easily scoped to a single component (like ComponentStore) or shared globally.

### Example Code (Defining a Store):
```typescript
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({ users: [] as User[], loading: false }),
  withComputed(({ users }) => ({
    count: computed(() => users().length),
    admins: computed(() => users().filter(u => u.role === 'admin'))
  })),
  withMethods((store, userService = inject(UserService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      const users = await lastValueFrom(userService.getAll());
      patchState(store, { users, loading: false });
    }
  }))
);
```

# Why It Matters

SignalStore represents the modern standard for Angular state management. It solves the complexity issues of Redux while providing more structure than just using raw `signal()` variables in a service. The **functional composition** allows you to mix and match behaviors (like entity management or undo/redo) without inheritance, leading to cleaner, more maintainable architectures that scale well.

# Common Mistakes

- **Direct State Mutation:** Even though it uses signals, you should always use `patchState` to update the store to ensure consistency and proper tracking.
- **Overcomplicating Small State:** For a single boolean flag, a raw `signal()` is enough. Only use SignalStore when you need computed logic, entity management, or a structured API.
- **Mixing Paradigms:** While SignalStore can handle RxJS (via `rxMethod`), try to keep the core state logic signal-based to maximize the benefits of fine-grained reactivity.

# Follow-up Questions

- **What is `patchState`?** (Answer: A utility function that performs a partial update of the store state in a type-safe way).
- **How do you handle side effects?** (Answer: By using `rxMethod` from `@ngrx/signals/rxjs-interop` to bridge the gap between RxJS streams and the SignalStore).
- **What is `withEntities`?** (Answer: An extension that provides a set of pre-built state properties and methods for managing normalized collections of objects, similar to NgRx Entity).

# References

- [NgRx Docs: SignalStore](https://ngrx.io/guide/signals/signal-store)
- [Angular Blog: Signals and State Management](https://blog.angular.io/signals-in-ngrx-a-new-era-of-angular-state-management-73c3b0f5b1d)

