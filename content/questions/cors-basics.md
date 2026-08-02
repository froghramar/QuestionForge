---
id: question.cors-basics
title: What is CORS?
slug: cors-basics
difficulty: Medium
topic: topic.web-fundamentals
concepts:
  - concept.cors
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

CORS is one of the most common hurdles web developers face. Interviewers want to know if you understand the underlying security model of the web and how to properly configure communication between a frontend and a backend hosted on different domains.

## Key Concepts

- **Same-Origin Policy (SOP):** The default browser security.
- **Preflight Requests:** Why the browser sends an `OPTIONS` request.
- **Origin definition:** Domain + Port + Protocol.
- **Security Implications:** Why `Access-Control-Allow-Origin: *` is dangerous in some contexts.
