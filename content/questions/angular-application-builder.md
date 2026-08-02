---
id: question.angular-application-builder
title: "Modern Build Pipeline: Esbuild and Vite"
slug: angular-application-builder
difficulty: Medium
topic: topic.angular-advanced
concepts:
  - concept.angular-build-system
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

The move from Webpack to Esbuild and Vite is one of the most significant infrastructure changes in Angular's history. Interviewers want to see if you understand the "why" behind this shift—primarily speed and modern standards. They also want to check if you're familiar with the new `application` builder and how it simplifies the configuration for projects that use both CSR and SSR.

## Key Concepts

- **Esbuild vs. Webpack:** Understanding the performance gap and the difference in implementation (Go vs. JS).
- **Vite in Development:** Why local dev is now nearly instantaneous.
- **Unified Builder:** How the `application` builder handles browser, server, and service worker builds.
- **Modern Output:** The shift toward ESM (ES Modules) by default.
- **Build Hooks:** Customizing the build process without "ejecting".

