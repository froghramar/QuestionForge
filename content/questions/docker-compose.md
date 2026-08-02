---
id: question.docker-compose
title: What is Docker Compose?
slug: docker-compose
difficulty: Easy
topic: topic.containerization
concepts:
  - concept.docker-compose
estimated_time: 5
updated: 2026-08-02
---

## Why This Is Asked

Interviewers want to see if you know how to manage more than just a single container. Docker Compose is the standard tool for local development of multi-tier applications (e.g., Frontend + API + Database).

## Key Concepts

- **YAML Configuration:** Defining infrastructure as code.
- **Service Dependency:** Using `depends_on` to control startup order.
- **Environment Variables:** Managing configuration across environments.
- **Networking:** How Compose automatically sets up a bridge network for your services.

## Question Variations

- "What is Docker Compose, and when would you use it instead of just `docker run`?"
- "How do you handle dependencies between services (e.g., ensuring a DB is ready before the API starts)?"
- "Can you use Docker Compose for production deployments? What are the trade-offs?"
- "Explain how networking works between services defined in the same `docker-compose.yml` file."
