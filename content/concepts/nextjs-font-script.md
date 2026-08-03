---
id: concept.nextjs-font-script
title: Next.js Font and Script Optimization
slug: nextjs-font-script
topic: topic.nextjs-fundamentals
description: Optimizing external assets like fonts and third-party scripts to improve performance and Core Web Vitals.
---
# Next.js Font and Script Optimization

Next.js provides built-in components to optimize the loading of fonts and scripts.

### Next Font (`next/font`)
Automatically optimizes your fonts (including custom fonts) and removes external network requests for improved privacy and performance.
- **Zero Layout Shift:** Automatically calculates the size of the font to prevent CLS.
- **Self-hosting:** Google Fonts are downloaded at build time and hosted with your deployment.

### Next Script (`next/script`)
The `Script` component enables you to set the loading priority of third-party scripts.
- **`beforeInteractive`:** Load before any Next.js code and before page hydration.
- **`afterInteractive`:** (Default) Load immediately after page hydration.
- **`lazyOnload`:** Load during idle time.
- **`worker`:** (Experimental) Load in a web worker.
