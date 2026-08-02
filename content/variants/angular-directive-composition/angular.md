---
id: variant.angular-directive-composition.angular
question: question.angular-directive-composition
technology: tech.angular
---
# Expected Answer

The **Directive Composition API** allow you to add directives to a component's host element from within the component's metadata. This provides a powerful alternative to component inheritance.

### Comparison:

| Feature | Component Inheritance | Directive Composition |
| :--- | :--- | :--- |
| **Flexibility** | Rigid (Single inheritance) | Highly flexible (Multiple composition) |
| **Complexity** | High (Fragile base classes) | Low (Isolated, reusable units) |
| **Template** | Must be managed carefully | Directives only affect the host element |
| **Metadata** | Inherited but hard to override | Explicitly composed and mapped |

### Example Code:
In this example, `MenuComponent` automatically gains all the functionality of the `CdkMenu` directive without needing to inherit from it or have the user manually add `cdkMenu` in the HTML.

```typescript
@Component({
  selector: 'app-menu',
  standalone: true,
  hostDirectives: [{
    directive: CdkMenu,
    inputs: ['cdkMenuOrientation: orientation'],
    outputs: ['cdkMenuOpened: opened'],
  }],
  template: `<ng-content></ng-content>`
})
export class MenuComponent {}
```

# Why It Matters

It enables **true code reuse**. Instead of creating a `BaseButton` class and having `PrimaryButton`, `SecondaryButton`, etc., inherit from it, you can create specific directives for behaviors (like `ClickTrackingDirective` or `FocusableDirective`) and compose them into any component that needs them. This keeps components small, focused, and incredibly easy to test and maintain. It also prevents the "giant base class" problem that plagues many large-scale Angular applications.

# Common Mistakes

- **Trying to compose components:** You can only compose **directives** into a component's host, not other components.
- **Forgetting Input/Output mapping:** If the directive has inputs you want the host component's users to access, you *must* explicitly list them in the `inputs` array of the `hostDirectives` metadata.
- **Directives with templates:** Only attribute directives should be used for composition, as the host component already has its own template.

# Follow-up Questions

- **Can you compose multiple directives?** (Answer: Yes, the `hostDirectives` array can contain as many directives as needed).
- **Can directives themselves have host directives?** (Answer: Yes, composition is recursive, allowing you to build complex behaviors from smaller pieces).
- **What happens to conflicts?** (Answer: If multiple directives bind to the same host property, standard Angular resolution rules apply, but usually directives should be designed to manage their own separate responsibilities).

# References

- [Angular Docs: Directive Composition API](https://angular.dev/guide/directives/directive-composition-api)
- [Angular Blog: Announcing Directive Composition API](https://blog.angular.io/angular-v15-is-now-available-df7b0641e305)

