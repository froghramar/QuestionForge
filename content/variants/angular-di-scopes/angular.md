---
id: variant.angular-di-scopes.angular
question: question.angular-di-scopes
technology: tech.angular
---
# Expected Answer

Angular's **Dependency Injection (DI)** system is hierarchical. A service's "scope" determines where it's available and how many instances of it exist.

### 1. The Root Scope (`providedIn: 'root'`)
This is the most common scope. The service is a **singleton** for the entire application. It is tree-shakeable, meaning if the service is not used anywhere, it won't be included in the final JavaScript bundle.

### 2. The Platform Scope (`providedIn: 'platform'`)
A singleton that is shared across multiple Angular applications running on the same page (rare in standard apps, common in micro-frontends).

### 3. Component/Directive Scope (`providers: [...]`)
When a service is added to a component's `providers` array, a **new instance** of that service is created for *every* instance of that component. The service is available to that component and all its children.

### 4. Resolution Modifiers
These decorators change how Angular searches for a dependency:
- **`@Optional()`:** Don't throw an error if the dependency isn't found (returns `null`).
- **`@Self()`:** Only look in the current component's injector.
- **`@SkipSelf()`:** Start looking in the parent's injector, skipping the current one.
- **`@Host()`:** Stop looking at the "host" component (the component that contains the template).

# Why It Matters

Incorrect scoping leads to two main problems:
1.  **State Bugs:** Providing a service at the component level when it should be a singleton causes state to be lost when the component is destroyed.
2.  **Memory/Performance:** Providing everything at the root when some services are only needed for a specific feature can lead to larger initial bundles and unnecessary memory usage.

Understanding hierarchical DI allows you to create sophisticated patterns, like a `TabService` that is shared only between a `TabGroup` and its `Tab` children, but isolated from other `TabGroups` on the same page.

# Example Code

### Tree-shakeable Root Provider
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {}
```

### Component-Level Provider (Isolation)
```typescript
@Component({
  selector: 'app-user-editor',
  providers: [UserEditStore] // New instance for every editor opened
})
export class UserEditorComponent {
  constructor(private store: UserEditStore) {}
}
```

### Resolution Modifiers
```typescript
export class MyComponent {
  constructor(
    @Optional() private logger?: LoggerService,
    @SkipSelf() private parentStore: DataStore
  ) {}
}
```

# Common Mistakes

- **Providing a service in both `AppModule` and a Lazy-Loaded Module:** This creates *two* instances of the service, which often breaks singleton logic (like authentication state).
- **Forgetting `providedIn: 'root'`:** Without this or an entry in a `providers` array, Angular will throw a "No provider for..." error.
- **Overusing Component-level providers:** This can lead to difficult-to-debug state issues if you expect a service to be a singleton.

# Follow-up Questions

- **What is the difference between `providedIn: 'root'` and putting a service in `AppModule` providers?** (Answer: `providedIn: 'root'` is tree-shakeable; `AppModule` providers are not).
- **How does DI work with Standalone Components?** (Answer: You can provide services in the `providers` array of the `@Component` decorator or in the `bootstrapApplication` configuration).
- **What is an Element Injector?** (Answer: It's the injector created for a specific DOM element/component, forming the basis of the DI hierarchy).

# References

- [Angular Docs: Hierarchical Dependency Injection](https://angular.dev/guide/di/hierarchical-dependency-injection)
- [Angular Docs: DI Resolution Modifiers](https://angular.dev/guide/di/di-in-action#resolution-modifiers)
