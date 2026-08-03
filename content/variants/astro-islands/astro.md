---
id: variant.astro-islands.astro
question: question.astro-islands
technology: tech.astro
---
# Expected Answer

Astro's **Island Architecture** (or "Component Islands") is a technique where interactive UI components are embedded into an otherwise static HTML page. 

By default, Astro renders every component to static HTML at build time and strips away all client-side JavaScript. If a component needs to be interactive (like a search bar or a carousel), you use a **client directive** to tell Astro to hydrate it on the client.

Example of hydration:
```astro
<!-- This component is static HTML, no JS shipped -->
<StaticNavbar />

<!-- This component will hydrate as soon as the page loads -->
<InteractiveSearch client:load />

<!-- This component will only hydrate when it scrolls into view -->
<HeavyCarousel client:visible />
```

# Why It Matters

Traditional SPAs (like those built with `create-react-app` or standard Next.js) send a large JavaScript bundle to the browser that must be parsed and executed before the page becomes interactive. This often leads to poor **Total Blocking Time (TBT)** and **First Input Delay (FID)**. 

Astro's islands allow you to achieve a near-perfect **Lighthouse score** by shipping 0KB of JavaScript for the vast majority of your content, while still providing the rich interactivity of modern frameworks where needed.

# Common Mistakes

- **Not using a client directive**: Forgetting to add `client:load` (or similar) to a component that needs JS. The component will appear but its buttons/effects won't work.
- **Over-hydrating**: Adding `client:load` to everything. This defeats the purpose of Astro and turns your site into a slow SPA.
- **State sharing**: Trying to share state between two islands using framework-specific state (like React Context). Since islands are isolated, you must use a framework-agnostic store like **Nanostores** to share state between a React island and a Svelte island.

# Follow-up Questions

- **What is the difference between `client:load` and `client:idle`?** (Answer: `client:load` hydrates immediately on page load; `client:idle` waits for the main thread to be free, usually via `requestIdleCallback`).
- **How do you pass data from the server to a client island?** (Answer: Via standard props. Astro handles the serialization of data automatically).
