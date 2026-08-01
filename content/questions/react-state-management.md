---
id: question.react-state-management
title: React State Management
slug: react-context-vs-zustand-redux
difficulty: Medium
topic: topic.react-fundamentals
estimated_time: 15
updated: 2026-08-01
---

## Why This Is Asked

State management choices have a direct impact on application performance and maintainability. Interviewers want to see that you understand the re-render implications of Context, know when to reach for external libraries, and can articulate the trade-offs.

## Key Concepts

- Context API: built-in, zero dependencies, ideal for low-frequency data (theme, auth, locale)
- Context triggers re-renders for all consumers when the provider value changes — no selector support
- State libraries (Zustand, Redux): use subscription models with selectors to prevent unnecessary re-renders
- Zustand/Jotai are minimal-boilerplate alternatives to Redux for most use cases
- The decision depends on update frequency, state complexity, and whether you need middleware/devtools
