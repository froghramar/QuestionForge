---
id: variant.angular-application-builder.angular
question: question.angular-application-builder
technology: tech.angular
---
# Expected Answer

Modern Angular (v17+) has replaced the legacy Webpack-based build system with a new pipeline powered by **Esbuild** and **Vite**, managed through the **Application Builder** (`@angular-devkit/build-angular:application`).

### Key Differences:

1.  **Build Speed:** Esbuild is written in Go and performs AOT compilation and bundling significantly faster than Webpack. Large projects often see build time reductions of 50-80%.
2.  **Dev Server:** In development mode, Angular now uses **Vite**. Instead of bundling the entire app upfront, Vite leverages native browser ES Modules to load only the code needed for the current view, making the initial start and Hot Module Replacement (HMR) extremely fast.
3.  **Unified Configuration:** The `application` builder replaces several older builders. It handles the browser bundle, the server-side (SSR) bundle, and prerendering in a single, coordinated process.
4.  **Output Format:** The new builder produces modern **ES Modules** by default, improving compatibility with modern CDNs and browsers.

### Configuration (`angular.json`):
```json
"builder": "@angular-devkit/build-angular:application",
"options": {
  "browser": "src/main.ts",
  "server": "src/main.server.ts",
  "ssr": {
    "entry": "src/server.ts"
  },
  "prerender": true
}
```

# Why It Matters

Developer productivity is directly tied to build speeds. By moving to Esbuild and Vite, Angular has removed one of the biggest complaints of large-scale enterprise development: slow iteration cycles. Furthermore, the unified `application` builder makes it trivial to add SSR or Prerendering to an existing app, which is critical for modern SEO and performance requirements.

# Common Mistakes

- **Assuming Webpack Plugins Still Work:** The new builder does not use Webpack, so `custom-webpack` configurations or plugins will not work. You must use the new `define` or `fileReplacements` options, or leverage the builder's native hooks.
- **Node.js Polyfills:** Esbuild does not automatically polyfill Node.js globals (like `Buffer` or `process`) for the browser. You must ensure your frontend code is truly browser-compatible or provide explicit polyfills.
- **Mixing Builders:** Projects should migrate fully to the `application` builder rather than trying to use the older `browser` and `server` builders separately.

# Follow-up Questions

- **What happens to the `dist` folder?** (Answer: The structure is simplified. Instead of separate `browser` and `server` folders, the `application` builder creates a more cohesive output structure ready for deployment).
- **Is Vite used for the production build?** (Answer: No, Vite is only used for the development server. Esbuild is used for both development bundling and the final production build).
- **Does this support CommonJS?** (Answer: While Esbuild can bundle CommonJS dependencies, the framework strongly encourages moving to ESM-only libraries for the best performance and tree-shaking).

# References

- [Angular Docs: Build System](https://angular.dev/tools/cli/build)
- [Angular Blog: Announcing the new Application Builder](https://blog.angular.io/announcing-angular-v17-4171657803d0)

