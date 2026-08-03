---
id: variant.nextjs-advanced-routing.nextjs
question: question.nextjs-advanced-routing
technology: tech.nextjs
---

# Expected Answer

**Parallel Routes** use "slots" to render multiple pages in the same layout. Slots are defined with `@folder` naming. They are passed as props to the layout at the same level.
- *Example:* A layout in `app/dashboard/layout.tsx` can receive `{ children, analytics, team }` if `@analytics` and `@team` folders exist in `app/dashboard/`.

**Intercepting Routes** allow you to "intercept" a navigation to show a different UI than the destination page.
- *Example:* When a user clicks a photo in a feed, you intercept the route to `/photo/123` and show it in a **modal** instead of navigating away. If the user refreshes or shares the link, they get the full `/photo/123` page.

# Why It Matters

These patterns enable "App-like" experiences in a web browser. They allow for complex UIs that maintain context (like the background page) while updating the URL and providing a shareable link to a specific piece of state (like an open modal).

# Example Code

### Parallel Routes Layout
```typescript
// app/dashboard/layout.tsx
export default function Layout({
  children,
  team,
  analytics
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="grid">
        <aside>{team}</aside>
        <section>{analytics}</section>
      </div>
    </>
  );
}
```

### Intercepting Modal
```text
app/
  feed/
    page.tsx (Link to /photo/123)
    @modal/
      (.)photo/[id]/
        page.tsx (The Modal UI)
  photo/[id]/
    page.tsx (The Full Page UI)
  layout.tsx (Renders {children} and {@modal})
```

# Common Mistakes

- **Forgetting `default.js`:** When a parallel route doesn't have a matching page for the current URL (e.g., on refresh), Next.js looks for `default.js`. If missing, it throws a 404 for that slot.
- **Confusing `(..)` logic:** It follows the folder structure of the **App Router**, not the filesystem, which can be tricky when using route groups `(groupname)`.
- **Complexity:** These features are powerful but add a lot of folder nesting. Use them only when the UX requirement justifies the complexity.

# Follow-up Questions

- **Can you nest parallel routes?** (Answer: Yes, you can have slots within slots).
- **How do you close an intercepting modal?** (Answer: Usually by calling `router.back()` or using a Link that points to the parent route).

# References

- [Next.js Documentation: Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Next.js Documentation: Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
