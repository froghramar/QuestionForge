---
id: concept.oauth2
title: OAuth 2.0 Authorization
slug: oauth2
topic: topic.web-fundamentals
description: Delegated authorization with access tokens, authorization servers, and protected resources.
---
# OAuth 2.0 Authorization

OAuth 2.0 is an authorization framework in which a resource owner grants a client limited access to a resource server. It does not itself define user authentication; OpenID Connect adds that identity layer.

```mermaid
sequenceDiagram
    participant User as Resource Owner
    participant Client as Client Application
    participant Auth as Authorization Server
    participant Resource as Resource Server

    User->>Client: Click Login
    Client->>Auth: Redirect to Auth (Client ID, Scope)
    Auth->>User: Show Login/Consent
    User->>Auth: Provide Credentials & Consent
    Auth->>Client: Redirect with Auth Code
    Client->>Auth: Exchange Code + Secret for Token
    Auth->>Client: Return Access Token
    Client->>Resource: Request Data (with Access Token)
    Resource->>Client: Return Resource Data
```
