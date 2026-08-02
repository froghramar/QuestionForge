---
id: concept.cors
title: Cross-Origin Resource Sharing (CORS)
slug: cors
topic: topic.web-fundamentals
description: A security mechanism that allows or restricts resource sharing between different origins.
---
# Cross-Origin Resource Sharing (CORS)

CORS is a browser-based security mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

## Why Does It Exist?
For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. This is called the **Same-Origin Policy (SOP)**. SOP prevents a malicious website from reading sensitive data from another site (e.g., your bank) using your authenticated session. CORS provides a way to safely relax this policy.

## How It Works
1.  **Simple Requests:** Certain requests (like GET/POST with standard headers) are sent directly. The server returns an `Access-Control-Allow-Origin` header. If it doesn't match the client's origin, the browser blocks the response.
2.  **Preflight Requests (OPTIONS):** For "non-simple" requests (e.g., using `PUT`, `DELETE`, or custom headers like `Content-Type: application/json`), the browser first sends an `OPTIONS` request to the server.
3.  **The Handshake:** The server responds to the preflight with allowed methods, headers, and origins. If the server approves, the browser then sends the actual request.

## Key Headers
- `Origin`: Sent by the client to indicate where the request is coming from.
- `Access-Control-Allow-Origin`: Sent by the server to indicate which origins are allowed.
- `Access-Control-Allow-Methods`: Lists permitted HTTP methods.
- `Access-Control-Allow-Headers`: Lists permitted custom headers.
- `Access-Control-Allow-Credentials`: Indicates if the response can be shared when the credentials flag is true (e.g., cookies).
