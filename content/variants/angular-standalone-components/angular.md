---
id: variant.angular-standalone-components.angular
question: question.angular-standalone-components
technology: tech.angular
---
# Expected Answer

**Standalone Components** are components that do not need to be declared in an `@NgModule`. They were introduced to simplify the Angular developer experience by reducing boilerplate and making components the primary unit of reuse.

### Key Characteristics:
1.  **Self-Contained:** A standalone component manages its own dependencies via the `imports` array in its decorator.
2.  **No Declarations:** You do not add them to any `declarations` array in an `@NgModule`.
3.  **Direct Usage:** They can be imported directly into other standalone components or into existing `NgModules`.
4.  **Simplified Routing:** You can lazy-load a standalone component directly in the router configuration without needing a wrapper module.

### How to Create One:
Set the `standalone: true` property in the `@Component` decorator:

```typescript
@Component({
  selector: 'app-my-standalone',
  standalone: true,
  imports: [CommonModule, OtherStandaloneComponent],
  template: `...`
})
export class MyStandaloneComponent {}
```

# Why It Matters

Standalone components make Angular easier to learn and use. They eliminate the "module tax"—the need to understand and maintain complex module hierarchies just to create a simple component. Technically, they also enable better **tree-shaking** because the dependency graph is more explicit and granular. For large applications, this results in smaller bundle sizes and faster build times.

# Example Code

### Bootstrapping a Standalone App

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

### Lazy Loading a Component

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  }
];
```

# Common Mistakes

- **Forgetting the `imports` array:** Since a standalone component doesn't inherit dependencies from a module, you must import `CommonModule` (or specific directives like `NgIf`, `NgFor`) if you use them in the template.
- **Trying to declare a standalone component in a module:** Standalone components should be in the `imports` array of a module, never the `declarations` array.
- **Mixing models unnecessarily:** While interoperability is supported, modern apps should aim for a fully standalone architecture to maximize simplicity.

# Follow-up Questions

- **Can a standalone component use an `@NgModule`?** (Answer: Yes, you can import an `@NgModule` into the `imports` array of a standalone component).
- **How do you handle global providers without `AppModule`?** (Answer: You provide them in the `providers` array of the `bootstrapApplication` configuration).
- **What happens if you use `NgIf` without importing `CommonModule` in a standalone component?** (Answer: The template will fail to compile because the `*ngIf` directive is unknown to the component).

# References

- [Angular Docs: Standalone Components](https://angular.dev/guide/components/standalone)
- [Angular Docs: Getting Started with Standalone](https://angular.dev/guide/components/standalone#getting-started)
