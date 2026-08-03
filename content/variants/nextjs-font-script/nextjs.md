---
id: variant.nextjs-font-script.nextjs
question: question.nextjs-font-script
technology: tech.nextjs
---

# Expected Answer

Next.js provides two specialized components for asset optimization:

1.  **`next/font`**:
    - It downloads Google Fonts at **build time** and hosts them locally. This eliminates a round-trip request to Google's servers.
    - It uses the `size-adjust` CSS property to match the dimensions of the fallback font with the web font, effectively **eliminating Cumulative Layout Shift (CLS)**.
    - It supports both Google Fonts and local custom fonts.

2.  **`next/script`**:
    - It allows you to control *when* a script loads using the `strategy` prop.
    - For analytics or non-critical scripts, `afterInteractive` or `lazyOnload` ensures the main content of the page is usable as soon as possible.
    - `beforeInteractive` is reserved for critical scripts like bot detection or theme loaders.

# Why It Matters

Properly managing these assets is crucial for achieving high Lighthouse scores and a good user experience. Fonts that "jump" or scripts that block the UI make an application feel slow and unpolished.

# Example Code

### Font Optimization
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Script Strategy
```typescript
import Script from 'next/script';

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/analytics.js"
        strategy="lazyOnload"
      />
      <h1>My Page</h1>
    </>
  );
}
```

# Common Mistakes

- **Using a standard `<link>` for Google Fonts:** This bypasses the build-time optimization and privacy benefits of `next/font`.
- **Setting all scripts to `beforeInteractive`:** This will significantly delay the time it takes for the page to become interactive.
- **Forgetting `display: 'swap'`:** This can lead to invisible text while the font is loading (FOIT - Flash of Invisible Text).

# Follow-up Questions

- **What is the `size-adjust` property?** (Answer: A CSS property that allows you to scale the fallback font so that it takes up the same amount of space as the custom font, preventing layout shift).
- **Can you use `next/font` with local `.woff2` files?** (Answer: Yes, using `localFont` from `next/font/local`).

# References

- [Next.js Documentation: Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Next.js Documentation: Script Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
