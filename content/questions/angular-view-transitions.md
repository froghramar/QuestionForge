---
id: question.angular-view-transitions
title: "Route Animations with View Transitions API"
slug: angular-view-transitions
difficulty: Easy
topic: topic.angular-advanced
concepts:
  - concept.angular-view-transitions
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Modern web applications are expected to have smooth, "app-like" transitions. Traditionally, this required complex CSS or the `@angular/animations` package. With native support for the View Transitions API in Angular (v17+), creating these effects is much simpler. Interviewers want to see if you are aware of this native capability and if you understand how it differs from traditional animation libraries.

## Key Concepts

- **`withViewTransitions()`:** Enabling the feature in the router configuration.
- **CSS Pseudo-elements:** Customizing transitions with `::view-transition-old` and `::view-transition-new`.
- **DOM Snapshotting:** How the browser captures the outgoing and incoming views.
- **Performance:** Why native transitions are smoother than JavaScript-driven animations.
- **Progressive Enhancement:** How the API handles browsers that don't support view transitions.

