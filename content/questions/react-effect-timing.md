---
id: question.react-effect-timing
title: useEffect vs useLayoutEffect
slug: useeffect-vs-uselayouteffect
difficulty: Hard
topic: topic.react-fundamentals
concepts:
  - concept.browser-rendering
estimated_time: 15
updated: 2026-08-01
---

## Why This Is Asked

This tests deep knowledge of React's rendering pipeline and the browser paint cycle. Interviewers want to know if you understand when each hook fires relative to the browser paint, and whether you can identify the specific scenarios where `useLayoutEffect` is necessary (DOM measurements, flicker prevention).

## Key Concepts

- `useEffect` fires asynchronously after the browser has painted — it does not block visual updates
- `useLayoutEffect` fires synchronously after DOM mutations but before the browser paints
- Use `useLayoutEffect` when you need to measure or mutate the DOM before the user sees it (e.g., tooltips, scroll position, animations)
- `useLayoutEffect` blocks the paint, so heavy computation in it causes visible jank
- `useLayoutEffect` doesn't run on the server — using it in SSR components triggers warnings

## Question Variations

- "What is the difference between `useEffect` and `useLayoutEffect`?"
- "When should you use `useLayoutEffect` instead of `useEffect`?"
- "Why can `useLayoutEffect` cause performance issues or 'jank' in the UI?"
- "How do these hooks interact with the browser's paint cycle?"
