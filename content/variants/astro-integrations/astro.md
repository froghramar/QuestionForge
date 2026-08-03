---
id: variant.astro-integrations.astro
question: question.astro-integrations
technology: tech.astro
---
# Expected Answer

An Astro Integration is a function that returns an object with specific hooks. These hooks allow you to tap into the lifecycle of an Astro project.

Example of a basic integration that logs a message when the build starts:
```javascript
export default function myIntegration() {
  return {
    name: 'my-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig, addWatchStrategy }) => {
        console.log('Setting up config...');
        // You can inject Vite plugins here
      },
      'astro:build:start': () => {
        console.log('Build is starting!');
      },
    },
  };
}
```

# Why It Matters

Integrations are the reason Astro is so flexible. Whether you want to add support for a new CSS-in-JS library, automatically generate an RSS feed, or optimize images using a custom service, the Integration API provides a stable, versioned way to do it without hacking the core framework.

# Common Mistakes

- **Over-using `astro:config:setup`**: While powerful, injecting too many Vite plugins or configurations can make debugging difficult for the end-user.
- **Not handling build environments**: An integration might work in `dev` but fail in `build` if it relies on a specific server context that doesn't exist during pre-rendering.
- **Ignoring Hook Order**: Certain hooks run before others. For example, you cannot modify the config in `astro:build:start` because the configuration has already been finalized.

# Follow-up Questions

- **What is the difference between `injectScript` and `addWatchStrategy`?** (Answer: `injectScript` adds a client-side script to every page; `addWatchStrategy` tells Astro's dev server to watch additional files/folders for changes).
- **How do integrations handle peer dependencies (like React or Tailwind)?** (Answer: Integrations should usually list these as `peerDependencies` to ensure the user has control over the version used in their project).
---
