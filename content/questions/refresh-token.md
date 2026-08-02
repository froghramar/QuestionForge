---
id: question.refresh-token
title: Refresh Tokens
slug: refresh-token
difficulty: Medium
topic: topic.web-fundamentals
estimated_time: 12
updated: 2026-08-02
---

## Why This Is Asked

JWT-based authentication is standard, but Access Tokens should be short-lived. Interviewers want to know if you understand how to maintain a user's session securely without forcing them to log in every few minutes.

## Key Concepts

- **Access Token**: Short-lived, used for authorization in every request.
- **Refresh Token**: Long-lived, used only to obtain a new Access Token.
- **Security**: Refresh tokens are usually stored in a database and can be revoked.
- **Rotation**: Issuing a new refresh token every time one is used to mitigate the risk of token theft.

## Question Variations

- "What is a 'refresh token,' and how does it differ from an 'access token'?"
- "Why should access tokens have a short expiration time while refresh tokens are long-lived?"
- "How do you handle 'refresh token rotation,' and what security problem does it solve?"
- "Where is the most secure place to store a refresh token in a web browser?"
