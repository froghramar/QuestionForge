---
id: variant.angular-testing-signals.angular
question: question.angular-testing-signals
technology: tech.angular
---
# Expected Answer

Testing **Signal-based components** is generally simpler and more synchronous than testing traditional components. However, there are specific APIs you must use to interact with signals correctly.

### 1. Updating Inputs
You cannot manually set a signal input value (e.g., `component.myInput.set(val)`) because signal inputs are read-only. Instead, use the `ComponentFixture.setInput` method.

### 2. Assertions
Since Signals are synchronous, updates to `computed()` values are available immediately after the source signal changes. You often don't need `fixture.whenStable()` for simple state changes.

### 3. Testing Effects
Effects run after change detection. In a testing environment, you can use `TestBed.flushEffects()` to ensure all scheduled effects have executed before making assertions.

### Example Code:

```typescript
it('should update the full name when inputs change', () => {
  const fixture = TestBed.createComponent(UserComponent);
  
  // Update signal inputs
  fixture.setInput('firstName', 'John');
  fixture.setInput('lastName', 'Doe');

  // Assert computed signal value
  expect(fixture.componentInstance.fullName()).toBe('John Doe');
  
  // Assert DOM
  fixture.detectChanges();
  const el = fixture.nativeElement.querySelector('p');
  expect(el.textContent).toContain('John Doe');
});
```

# Why It Matters

Properly testing signals ensures that your reactive logic is sound. Because signals provide fine-grained reactivity, your tests can be more precise. Understanding `setInput()` is critical because it mimics how the Angular engine updates inputs during a real render cycle, ensuring that `computed()` and `effect()` dependencies are tracked correctly in your test suite.

# Common Mistakes

- **Direct Assignment:** Attempting `component.myInput = 'value'` will fail because the property is a Signal function, not a plain value.
- **Forgetting `fixture.detectChanges()` for DOM checks:** While the Signal value updates synchronously, the **DOM** still requires a change detection cycle to reflect those changes (unless using Zoneless, but even then, the fixture needs to be told to check).
- **Ignoring Effects:** If your logic relies on an `effect()`, your test might fail if you don't allow the effect to run (either via `detectChanges()` or `flushEffects()`).

# Follow-up Questions

- **How do you test a `model()` input?** (Answer: You can use `setInput()` to set the initial value and then subscribe to the corresponding change output, or update it directly if you have access to the underlying signal).
- **What is `TestBed.runInInjectionContext`?** (Answer: A utility that allows you to test standalone signals or functions that use `inject()` outside of a component class).
- **Does Zoneless affect testing?** (Answer: Yes, it reduces the reliance on `fakeAsync` and `tick()` for many UI scenarios, as updates are more predictable).

# References

- [Angular Docs: Testing Signals](https://angular.dev/guide/testing/components-scenarios#signals)
- [Angular Docs: ComponentFixture API](https://angular.dev/api/core/testing/ComponentFixture)

