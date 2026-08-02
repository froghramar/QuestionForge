---
id: variant.angular-control-flow.angular
question: question.angular-control-flow
technology: tech.angular
---
# Expected Answer

Modern Angular (v17+) uses a new **Built-in Control Flow** syntax using `@` symbols. This replaces the older structural directives like `*ngIf` and `*ngFor`.

### Key Differences:

1.  **Syntax:**
    - **Old:** `<div *ngIf="isLoggedIn">Welcome</div>`
    - **New:** `@if (isLoggedIn) { <div>Welcome</div> }`
2.  **Performance:** The new `@for` loop is significantly faster than `*ngFor`. It also makes the `track` property **mandatory**, which ensures developers always provide a way for Angular to identify unique items, preventing unnecessary DOM recreations.
3.  **Imports:** You no longer need to import `CommonModule` or `NgIf/NgFor` into your standalone components to use control flow.
4.  **Empty States:** The new `@for` has a built-in `@empty` block, whereas `*ngFor` required a separate `*ngIf` to check for list length.

### Example Comparison:

**Old (*ngFor):**
```html
<ul *ngIf="items.length > 0; else noItems">
  <li *ngFor="let item of items; trackBy: trackById">
    {{ item.name }}
  </li>
</ul>
<ng-template #noItems><p>No items found.</p></ng-template>
```

**New (@for):**
```html
<ul>
  @for (item of items; track item.id) {
    <li>{{ item.name }}</li>
  } @empty {
    <p>No items found.</p>
  }
</ul>
```

# Why It Matters

The new control flow makes code more readable and easier to maintain by removing the need for `<ng-template>` or `<ng-container>` wrappers in many cases. Most importantly, the performance gains are substantial—the new `@for` can be up to 90% faster in some scenarios because it bypasses much of the overhead associated with structural directives and `Zone.js` interaction.

# Common Mistakes

- **Forgetting `track`:** In the new `@for`, `track` is required. You can use the item itself (`track $index` or `track item`), but using a unique ID is best.
- **Mixing syntaxes:** While you can use both in the same project, it's recommended to migrate to the new syntax for consistency and performance. Angular provides a CLI migration tool: `ng generate @angular/core:control-flow`.
- **Misunderstanding `@empty`:** The `@empty` block only shows if the collection is empty, not if it's `null` or `undefined` (though usually, you'd handle that with an `@if`).

# Follow-up Questions

- **What is the difference between `trackBy` and `track`?** (Answer: `trackBy` required a function in the component class; `track` is an expression directly in the template).
- **Is the new control flow just syntactic sugar?** (Answer: No, it's a compiler-level integration that generates more efficient code than the directive-based approach).
- **Can I still use `*ngIf`?** (Answer: Yes, structural directives are still supported for backward compatibility, but the new syntax is preferred).

# References

- [Angular Docs: Built-in Control Flow](https://angular.dev/guide/templates/control-flow)
- [Angular Blog: Announcing Angular v17](https://blog.angular.io/announcing-angular-v17-4171657803d0)
