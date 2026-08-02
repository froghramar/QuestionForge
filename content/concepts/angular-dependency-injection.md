---
id: concept.angular-dependency-injection
title: Angular Dependency Injection
slug: angular-dependency-injection
topic: topic.angular-fundamentals
description: The hierarchical DI system in Angular.
---
# Angular Dependency Injection
Dependency Injection (DI) is a core design pattern in Angular. It allows classes to receive their dependencies from an external source rather than creating them internally.

Key concepts:
- **Injectors:** Responsible for creating and providing instances of dependencies.
- **Providers:** Define how a dependency should be created (e.g., `providedIn: 'root'`).
- **Tokens:** Unique identifiers for dependencies.
- **Hierarchical DI:** Different levels of injectors (root, platform, component-level) allow for flexible scoping of services.
