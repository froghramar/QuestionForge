---
id: variant.angular-aria-stable.angular
question: question.angular-aria-stable
technology: tech.angular
---
# Expected Answer

The **Angular ARIA** package (stabilized in v22) provides a set of directives and tools to make accessibility a first-class citizen in Angular applications. Instead of manually managing strings like `aria-expanded="true"`, you use declarative directives that synchronize with your component's state.

### Key Tools:

1.  **Aria State Directives:** Directives like `ariaExpanded`, `ariaSelected`, and `ariaDisabled` that bind directly to signals or booleans and handle the attribute updates efficiently.
2.  **Focus Management:** The `FocusTrap` and `FocusMonitor` tools (now part of the stable ARIA package) allow you to trap focus within a modal or detect how a user is interacting with an element (mouse vs. keyboard).
3.  **AriaLive Service:** A service to announce messages to screen readers without changing the visual UI.
4.  **Widget Patterns:** Implementation of complex patterns like `tabs`, `listbox`, and `tree` that ensure all required ARIA relationships (like `aria-controls` and `aria-labelledby`) are set up correctly.

### Example Code (Accessible Accordion):
```typescript
@Component({
  standalone: true,
  imports: [AriaModule],
  template: `
    <button [ariaExpanded]="isOpen()" (click)="toggle()">
      Toggle Section
    </button>
    <div [hidden]="!isOpen()" role="region">
      Content...
    </div>
  `
})
export class AccordionComponent {
  isOpen = signal(false);
  toggle() { this.isOpen.update(v => !v); }
}
```

# Why It Matters

Implementing accessibility manually is error-prone. It's easy to forget to update an `aria-` attribute when a component's state changes, leading to a confusing experience for screen reader users. Angular ARIA reduces this risk by making a11y part of the standard development workflow. By using these stable patterns, you ensure your application complies with legal standards (like WCAG) and provides a better experience for all users.

# Common Mistakes

- **Only using visual states:** Hiding an element with CSS but not updating `aria-hidden` or removing it from the tab order.
- **Manual attribute manipulation:** Trying to use `[attr.aria-expanded]="isOpen()"` instead of the modern `[ariaExpanded]="isOpen()"` directive which handles edge cases better.
- **Ignoring Focus:** Opening a modal but leaving the user's focus on the button that opened it, forcing screen reader users to navigate the entire page to find the new content.

# Follow-up Questions

- **What is a Focus Trap?** (Answer: A technique where the Tab key only cycles through elements within a specific container, like a modal, preventing the user from accidentally navigating to the background content).
- **How does `AriaLive` handle different priorities?** (Answer: It supports `polite` (waits for the screen reader to finish current speech) and `assertive` (interrupts current speech for critical updates)).
- **Does Angular ARIA replace the CDK?** (Answer: No, it stabilizes and enhances the accessibility features that were previously part of the CDK, making them more idiomatic for modern Angular).

# References

- [Angular Docs: Accessibility](https://angular.dev/guide/accessibility)
- [Angular Blog: Stable Accessibility Patterns in v22](https://blog.angular.io/angular-v22-stable-aria)

