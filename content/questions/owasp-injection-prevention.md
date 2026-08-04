---
id: question.owasp-injection-prevention
title: Preventing injection attacks
slug: owasp-injection-prevention
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.owasp-top-10
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Injection remains a core OWASP risk because untrusted input can alter commands, queries, or interpreters when mixed with program syntax. Interviewers expect parameterization as the primary defense, contextual allowlisting for dynamic identifiers, and an understanding that escaping alone is fragile.

## Key Concepts

- **Data vs code:** Parameterized APIs keep input as data instead of executable syntax.
- **Allowlisting:** Dynamic query identifiers, sort fields, and command choices need a closed set of permitted values.
- **Least privilege:** Database and service accounts limit the impact of an injection flaw.
- **Validation:** Input validation complements parameterization but does not replace it.

## Question Variations

- "Why are prepared statements safer than string concatenation?"
- "How do you safely implement a user-selected sort column?"
- "Does input escaping prevent every injection type?"
