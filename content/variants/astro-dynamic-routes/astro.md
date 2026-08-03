---
id: variant.astro-dynamic-routes.astro
question: question.astro-dynamic-routes
technology: tech.astro
---
# Expected Answer

In Astro, dynamic routes are created using brackets in the filename. For static sites (SSG), you **must** export a `getStaticPaths()` function to define all possible values for the parameters.

Example: `src/pages/post/[id].astro`
```astro
---
export async function getStaticPaths() {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post }, // Pass data directly to the component
  }));
}

const { id } = Astro.params;
const { post } = Astro.props;
---
<h1>{post.title}</h1>
```

# Why It Matters

Using `props` inside `getStaticPaths` is a significant optimization. It allows you to fetch your data once during the path generation phase and pass it directly to the page template, preventing the page from having to fetch the same data again by ID.

# Common Mistakes

- **Incorrect return structure**: `getStaticPaths` must return an array of objects, each containing a `params` key. Returning a simple array of strings will fail.
- **Fetching data in the component script**: In SSG mode, if you have 100 posts, doing `fetchPost(id)` in the component script means 100 separate requests after `getStaticPaths` has already run. Use `props` instead.
- **Rest parameters confusion**: Using `[id].astro` only matches one segment. To match `/a/b/c`, you must use `[...slug].astro`.

# Follow-up Questions

- **Does `getStaticPaths` run in SSR mode?** (Answer: No. In SSR mode, the route is generated on-demand and `getStaticPaths` is ignored. You simply use `Astro.params` to fetch data on the fly).
- **How do you limit the number of pages generated during development?** (Answer: You can return a sliced array in `getStaticPaths` if `process.env.NODE_ENV === 'development'`).
