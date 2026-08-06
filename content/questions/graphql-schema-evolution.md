---
id: question.graphql-schema-evolution
title: GraphQL Schema Evolution
slug: graphql-schema-evolution
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This evaluates whether a candidate can change a GraphQL contract while many independently released clients still depend on it. It focuses on nullability, deprecation, schema telemetry, and safe migrations rather than simply adding fields.

## Key Concepts

- **Additive changes:** New optional fields and enum values can still affect clients that assume a closed set of values.
- **Deprecation workflow:** Mark obsolete fields with a reason, ship a replacement, measure usage, then remove deliberately.
- **Nullability:** Tightening or loosening nullability affects error propagation and client code generation contracts.
- **Input safety:** Add optional input fields; avoid changing a field's type or making an existing optional input required.

## Question Variations

- "Why can adding an enum value be a breaking change?"
- "How do you migrate a GraphQL field to a new type?"
- "When is it safe to remove a deprecated field?"
- "How does non-null error propagation affect schema changes?"
