---
id: concept.nextjs-image-optimization
title: Next.js Image Optimization
slug: nextjs-image-optimization
topic: topic.nextjs-fundamentals
description: How Next.js automatically optimizes images for performance and Core Web Vitals.
---
# Next.js Image Optimization

The `next/image` component extends the HTML `<img>` element with features to help you achieve good **Core Web Vitals**, specifically **Largest Contentful Paint (LCP)** and **Cumulative Layout Shift (CLS)**.

### Key Features
- **Size Optimization:** Automatically serves correctly sized images for each device using modern formats like WebP and AVIF.
- **Visual Stability:** Prevents layout shift automatically by requiring dimensions or using `fill`.
- **Faster Page Loads:** Images are only loaded when they enter the viewport using native browser lazy loading, with optional blur-up placeholders.
- **Asset Flexibility:** On-demand image resizing, even for images stored on remote servers.
