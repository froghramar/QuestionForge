---
id: question.graphql-api-design
title: GraphQL API Design
slug: graphql-api-design
difficulty: Medium
topic: topic.distributed-systems
estimated_time: 15
updated: 2026-08-06
---

## Why This Is Asked

This evaluates whether a candidate understands GraphQL as a typed API contract rather than merely a flexible query syntax. A strong answer balances client-selected data with server-side performance, authorization, schema evolution, and operational controls.

## Key Concepts

- **Schema design:** Model domain types, queries, mutations, inputs, and connections with clear ownership and nullability.
- **Resolver efficiency:** Avoid the N+1 query problem with batching and per-request caching, while keeping resolvers independently testable.
- **Authorization:** Enforce permissions in resolvers or domain services; client-selected fields must not bypass access rules.
- **Query controls:** Limit depth, complexity, page size, and execution time to protect backend services from expensive queries.

## Question Variations

- "How does GraphQL prevent over-fetching and under-fetching?"
- "What causes the N+1 problem in GraphQL, and how would you fix it?"
- "How would you paginate a large GraphQL connection?"
- "Where should authorization be enforced in a GraphQL API?"
