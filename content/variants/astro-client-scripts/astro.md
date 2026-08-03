---
id: variant.astro-client-scripts.astro
question: question.astro-client-scripts
technology: tech.astro
---
# Expected Answer

Standard `<script>` tags in `.astro` files are processed by Astro's bundler. This means you can use `import` statements and TypeScript.

To pass server-side data to a script, use the `define:vars` directive:

```astro
---
const color = "blue";
---
<button id="myButton">Click Me</button>

<script define:vars={{ color }}>
  const btn = document.getElementById('myButton');
  btn.addEventListener('click', () => {
    console.log(`The color is ${color}`);
  });
</script>
```

# Why It Matters

Using standard scripts is often more performant than bringing in a full framework (like React) just for a few lines of interactivity. Astro's bundling ensures that if you use the same component 10 times on a page, the script is only loaded once in the browser.

# Common Mistakes

- **Using `is:inline` unnecessarily**: This prevents bundling and minification, making the JS payload larger and preventing you from using imports.
- **Variable scoping with `define:vars`**: Variables passed via `define:vars` are serializable. You cannot pass functions or complex class instances from the server to the client this way.
- **View Transitions**: Standard scripts run when the page first loads. If you use View Transitions, you must listen for the `astro:page-load` event to re-attach event listeners on navigation.

# Follow-up Questions

- **How do you import a node module in a client-side script?** (Answer: Just use a standard ESM `import` inside the `<script>` tag).
- **What is the difference between a script and an Island?** (Answer: A script is raw DOM manipulation; an Island is a self-contained component managed by a UI framework like React/Vue).
---
