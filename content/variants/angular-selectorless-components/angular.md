---
id: variant.angular-selectorless-components.angular
question: question.angular-selectorless-components
technology: tech.angular
---
# Expected Answer

**Selectorless Components** (introduced in Angular 22) allow components to be used in templates without a string `selector` (e.g., `'app-header'`). Instead, you import the component class and use it directly.

### Comparison:

**Traditional (String Selector):**
```typescript
@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `...`
})
export class UserCardComponent {}

// Usage in another component template:
// <app-user-card [user]="user"></app-user-card>
```

**Modern (Selectorless - v22+):**
```typescript
@Component({
  standalone: true,
  template: `...`
})
export class UserCardComponent {}

// Usage in another component template:
// <UserCardComponent [user]="user"></UserCardComponent>
```

### Key Advantages:
1.  **Strict Typing:** The Angular compiler can verify that the component being used is actually the class you imported.
2.  **Refactoring:** If you rename `UserCardComponent` to `ProfileCardComponent`, your IDE can automatically update all templates where it's used. With string selectors, this was often a "search and replace" task prone to errors.
3.  **Clarity:** It removes the mapping between a class name and a kebab-case string, making the relationship between the code and the template more explicit.

# Why It Matters

Selectorless components bring Angular closer to the ergonomics of other modern frameworks like React while maintaining Angular's strong type system. It significantly reduces the "magic strings" in the framework and makes the dependency graph of an application much clearer to both developers and build tools. This is a cornerstone of the simplified Angular architecture in version 22.

# Common Mistakes

- **Assuming selectors are deprecated:** String selectors are still supported and necessary for certain patterns (like attribute selectors for accessibility or CSS integration), but class-based consumption is now the preferred default for standard UI components.
- **Forgetting the import:** Just like standalone components required importing the class, selectorless components *must* be imported into the `imports` array (or be available via a shared module) to be used.

# Follow-up Questions

- **Can I still use attribute selectors?** (Answer: Yes, you can still provide a `selector` in the decorator if you need attribute or CSS-class based selection).
- **How does this affect tree-shaking?** (Answer: It improves it, as the link between the template and the class is direct and statically analyzable).
- **Does this work with legacy NgModules?** (Answer: Yes, if a component is exported from a module, you can use its class name in components that import that module).

# References

- [Angular Docs: Component Metadata](https://angular.dev/api/core/Component)
- [Angular Blog: Simplified Component Model in v22](https://blog.angular.io/angular-v22-simplified-model)

