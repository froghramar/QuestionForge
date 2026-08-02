---
id: variant.angular-change-detection-strategies.angular
question: question.angular-change-detection-strategies
technology: tech.angular
---
# Expected Answer

Angular provides two strategies for change detection:

### 1. Default Strategy
Angular checks the component and its entire child subtree whenever *any* asynchronous event occurs (click, timer, HTTP response) that is tracked by `Zone.js`. This is simple but can become a performance bottleneck in large applications as the tree grows.

### 2. OnPush Strategy
Angular only checks the component if:
- One of its **Input properties** receives a new reference (immutability is key).
- An **event** originates from the component or its children (e.g., a button click).
- An **Observable** linked via the `async` pipe emits a new value.
- You manually call `cdr.markForCheck()`.

### Comparison Table

| Feature | Default | OnPush |
| :--- | :--- | :--- |
| **Check frequency** | Every event | Optimized / Selective |
| **Performance** | Lower (in large apps) | High |
| **Data Requirements** | Mutable or Immutable | Strictly Immutable (or Signals) |
| **Complexity** | Low | Moderate |

# Why It Matters

Using `OnPush` significantly reduces the work Angular has to do. In a complex dashboard with hundreds of components, using the `Default` strategy might lead to "jank" or laggy interactions because moving a mouse or typing could trigger hundreds of unnecessary checks. `OnPush` ensures that only the relevant branches of the component tree are updated.

# Example Code

### Implementing OnPush
Note that the `user` object must be replaced with a new reference for the change to be detected.

```typescript
@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: `<div>{{ user().name }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {
  user = input.required<{name: string}>();
}
```

# Common Mistakes

- **Mutating objects with OnPush:** Updating `user.name = 'New Name'` won't trigger change detection because the object reference remains the same.
- **Forgetting the Async Pipe:** If you subscribe manually in a component with `OnPush`, you must call `ChangeDetectorRef.markForCheck()` manually inside the subscription, or Angular won't update the UI.
- **Overusing `detectChanges()`:** This runs change detection immediately and synchronously. Usually, `markForCheck()` is preferred as it marks the path for the next scheduled cycle, which is more efficient.

# Follow-up Questions

- **How do Signals change this?** (Answer: Signals provide fine-grained reactivity that allows Angular to update specific parts of the template even more efficiently than `OnPush`).
- **What causes "ExpressionChangedAfterItHasBeenCheckedError"?** (Answer: Changing a property that is used in a template *after* Angular has already checked that component in the current cycle).
- **Does `OnPush` affect child components?** (Answer: Yes, if a parent is skipped, its entire subtree is also skipped).

# References

- [Angular Docs: Change Detection](https://angular.dev/guide/components/change-detection)
- [Angular Docs: Skipping Component Subtrees](https://angular.dev/guide/components/change-detection#skipping-subtrees)
