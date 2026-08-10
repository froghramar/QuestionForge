---
id: concept.dependency-injection
title: Dependency Injection (DI)
slug: dependency-injection
topic: topic.design-patterns
description: Inversion of Control and dependency management.
---
# Dependency Injection
Dependency Injection is a design pattern in which an object or function receives other objects or functions that it depends on. It is a form of **Inversion of Control (IoC)**, where the creation and binding of dependencies are handled by an external entity (the DI Container).

```mermaid
graph TD
    subgraph Manual [Manual Control]
        Client[Client Class] -->|New| Service[Service Instance]
    end

    subgraph DI [Dependency Injection]
        Injector[DI Container / Injector]
        Client2[Client Class]
        Service2[Service Instance]
        
        Injector -->|Creates| Service2
        Injector -->|Injects| Service2
        Service2 -.->|Used by| Client2
    end
```
