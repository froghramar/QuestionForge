---
id: variant.nextjs-image-optimization.nextjs
question: question.nextjs-image-optimization
technology: tech.nextjs
---

# Expected Answer

The `next/image` component provides automatic image optimization that would otherwise require significant manual work:

1.  **Automatic Resizing:** It generates multiple versions of an image at different sizes and serves the best one based on the user's screen size (using the `srcset` attribute).
2.  **Modern Formats:** It converts images to modern formats like WebP or AVIF automatically, which have better compression than JPEG/PNG.
3.  **Prevents Layout Shift (CLS):** It requires you to provide `width` and `height` (or use `fill`), which allows the browser to reserve space for the image before it loads, preventing the page from "jumping."
4.  **Lazy Loading:** Images are lazy-loaded by default, meaning they only download as they approach the viewport.

**Key Props:**
- `priority`: Set to `true` for the Largest Contentful Paint (LCP) element (like a hero image) to disable lazy loading and prioritize it.
- `placeholder="blur"`: Shows a low-res blurred version while the main image loads.
- `fill`: Useful for responsive containers where you don't know the exact dimensions.

# Why It Matters

Proper image optimization is the fastest way to improve a site's performance score. It reduces bandwidth usage for users and improves SEO by hitting Core Web Vitals targets.

# Example Code

### Basic Usage
```typescript
import Image from 'next/image';
import profilePic from '../public/me.png';

export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width and height are automatically provided for static imports
      placeholder="blur"
    />
  );
}
```

### Remote Image with `fill`
```typescript
<div style={{ position: 'relative', height: '400px' }}>
  <Image
    src="https://example.com/hero.jpg"
    alt="Hero image"
    fill
    style={{ objectFit: 'cover' }}
    priority // Important if this is the hero image!
  />
</div>
```

# Common Mistakes

- **Not using `priority` on hero images:** This delays the LCP, hurting performance scores.
- **Using `fill` without `position: relative` on the parent:** This causes the image to expand to the nearest positioned ancestor (often the whole page).
- **Forgetting to configure `images.remotePatterns` in `next.config.js`:** Next.js will throw an error when trying to load images from external domains for security reasons.

# Follow-up Questions

- **Can you use `next/image` with SVG files?** (Answer: Yes, but Next.js doesn't optimize SVGs since they are vectors. It still helps with lazy loading and preventing layout shift).
- **What is the `loader` prop?** (Answer: It's a function that returns a URL string for the image, allowing you to use third-party services like Cloudinary or Imgix for optimization instead of Next.js's built-in server).

# References

- [Next.js Documentation: Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js API Reference: Image Component](https://nextjs.org/docs/app/api-reference/components/image)
