---
id: variant.astro-testing-strategies.astro
question: question.astro-testing-strategies
technology: tech.astro
---
# Expected Answer

For **Unit Testing**, Astro provides the experimental **Container API**. This allows you to render a component to a string of HTML in a controlled environment (like Vitest).

```typescript
// component.test.ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import MyComponent from './MyComponent.astro';
import { expect, test } from 'vitest';

test('MyComponent renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(MyComponent, {
    props: { name: 'World' },
  });

  expect(result).toContain('<h1>Hello World</h1>');
});
```

For **End-to-End (E2E) Testing**, use **Playwright**. Since Astro generates standard HTML, Playwright is ideal for verifying that interactions, View Transitions, and API calls work correctly in a real browser.

# Why It Matters

Testing `.astro` components ensures that your server-side logic (fetching data, processing props) is correct before it ever reaches a browser. The Container API is a breakthrough because it removes the need to run a full dev server just to test a single component's output.

# Common Mistakes

- **Testing implementation details**: Instead of testing internal logic, focus on the rendered HTML output.
- **Ignoring the hydration boundary**: A unit test for a `.astro` component won't tell you if its React Island works; you need an E2E test for that.
- **Not mocking `locals`**: If your component relies on `Astro.locals` (set by middleware), you must provide those in the Container API's options.

# Follow-up Questions

- **Can you use Testing Library with Astro?** (Answer: Yes, by passing the HTML string from the Container API into a tool like `jsdom` and using `within()` or `screen`).
- **How do you test a middleware?** (Answer: Middleware is just a function; you can test it by passing a mock `context` and `next` function).
---
