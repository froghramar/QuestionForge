---
id: concept.vue-component-caching
title: Vue Component Caching
slug: vue-component-caching
topic: topic.vue-fundamentals
description: Preserving inactive dynamic component instances with KeepAlive.
---
# Vue Component Caching

`KeepAlive` caches inactive dynamic component instances instead of unmounting them. Cached components use activated and deactivated lifecycle hooks as they move in and out of the active view.
