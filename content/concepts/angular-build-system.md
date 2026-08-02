---
id: concept.angular-build-system
title: Modern Build System (Esbuild & Vite)
slug: angular-angular-build-system
topic: topic.angular-advanced
description: The high-performance build pipeline using Esbuild and Vite.
---
# Angular Build System
Angular has moved from a Webpack-based build system to a modern pipeline powered by **Esbuild** and **Vite**. This change, stabilized in recent versions, dramatically improves build speeds and the development experience.

Key Components:
- **Esbuild:** Used for the production build and ahead-of-time (AOT) compilation. It is significantly faster than Webpack due to its Go-based implementation.
- **Vite:** Used as the development server. It provides near-instantaneous hot module replacement (HMR).
- **Application Builder:** The new unified builder (`@angular-devkit/build-angular:application`) that handles both browser and server (SSR) builds in a single pass.
- **Index HTML Generation:** The new builder uses a more efficient way to inject scripts and styles, supporting modern features like module/nomodule patterns and preloading out of the box.
