---
id: variant.astro-performance.astro
question: question.astro-performance
technology: tech.astro
---
# Expected Answer

Astro provides a suite of tools to ensure websites are as fast as possible out of the box:

1.  **Built-in Image Component**: Automatically handles resizing, format conversion (to WebP/AVIF), and prevents layout shifts by requiring dimensions.
    ```astro
    import { Image } from 'astro:assets';
    <Image src={myLocalImage} alt="Description" width={800} height={600} />
    ```
2.  **View Transitions**: Enables a client-side router for Multi-Page Applications.
    ```astro
    <!-- src/layouts/Layout.astro -->
    <head>
      <ClientRouter />
    </head>
    ```
3.  **Prefetching**: Astro can prefetch pages when a link enters the viewport or when a user hovers over it, making navigation feel instantaneous.
    ```html
    <a href="/about" data-astro-prefetch="hover">About</a>
    ```

# Why It Matters

Performance isn't just about speed; it's about **User Experience and SEO**. By automating complex optimizations like responsive images and intelligent prefetching, Astro allows developers to build high-quality sites without being experts in web performance.

# Common Mistakes

- **Misconfiguring `ClientRouter`**: Using View Transitions can break standard script execution. You must use the `astro:page-load` event instead of `DOMContentLoaded` to initialize third-party libraries.
- **Ignoring Image `width` and `height`**: While the component optimizes the file, omitting dimensions can still cause Cumulative Layout Shift (CLS).
- **Over-prefetching**: Setting `data-astro-prefetch` on every link in a large list can waste user bandwidth and slow down the initial page load.

# Follow-up Questions

- **How do you maintain state during a View Transition?** (Answer: Use the `transition:persist` directive on an element to keep it alive across page loads).
- **Does the Image component work with remote URLs?** (Answer: Yes, but you must configure authorized domains in `astro.config.mjs` for security).
