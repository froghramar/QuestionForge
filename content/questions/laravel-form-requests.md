---
id: question.laravel-form-requests
title: Laravel Form Requests
slug: laravel-form-requests
difficulty: Medium
topic: topic.laravel-fundamentals
estimated_time: 15
updated: 2026-08-05
---
## Why This Is Asked
Form requests test API boundary design and whether validation and authorization stay out of controllers.
## Key Concepts
- Form requests encapsulate validation and authorization for an endpoint.
- Controllers consume validated data rather than the entire input.
- Validation failures return structured client errors for JSON requests.
- Domain rules remain separate from basic request shape validation.
## Question Variations
- "Why use a FormRequest instead of inline validation?"
- "Where should request authorization live?"
- "What status code does Laravel return for JSON validation errors?"
