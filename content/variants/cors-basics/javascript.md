---
id: variant.cors-basics.javascript
question: question.cors-basics
technology: tech.javascript
---
# Expected Answer

**CORS (Cross-Origin Resource Sharing)** is a security feature implemented by browsers. It allows servers to specify who can access their resources from a different origin. An **origin** is defined by the combination of the protocol (http vs https), the domain (example.com), and the port (80 vs 443).

If your frontend is at `app.example.com` and it tries to fetch data from `api.example.com`, the browser will block the request unless `api.example.com` sends back the header `Access-Control-Allow-Origin: https://app.example.com`.

For complex requests (like those with JSON bodies), the browser performs a **Preflight**—it sends an `OPTIONS` request first to ask the server for permission before sending the actual data.

# Why It Matters

Without CORS (and the Same-Origin Policy), any website you visit could use your browser to make authenticated requests to another site where you are logged in (like your email or bank), potentially stealing your data. Understanding CORS is essential for debugging the "CORS error" in the console and for building secure APIs.

# Example Scenario

### 1. The Preflight (OPTIONS)
**Browser sends:**
```http
OPTIONS /data HTTP/1.1
Origin: https://my-app.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
```

### 2. The Server Response
**Server sends:**
```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://my-app.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### 3. The Actual Request
If the server response matches, the browser finally sends the `POST` request.

# Common Mistakes

- **Using `*` with credentials:** You cannot use `Access-Control-Allow-Origin: *` if you also need to send cookies (`Access-Control-Allow-Credentials: true`). You must specify the exact origin.
- **Thinking CORS is a server-side protection:** CORS is a **browser** protection. A tool like `curl` or a backend server can still call your API regardless of CORS settings.
- **Handling CORS only in the app logic:** Forgetting that the web server (Nginx/Apache) or a Load Balancer might also need to be configured to handle the `OPTIONS` preflight.

# Follow-up Questions

- **What is a "Simple Request"?** (Answer: A request using GET, HEAD, or POST with standard content types like `text/plain` or `application/x-www-form-urlencoded` that doesn't trigger a preflight).
- **How can you bypass CORS during development?** (Answer: Using a proxy in your dev server, or a browser extension that disables CORS checks—though the latter is not recommended).
- **What is the difference between `Access-Control-Allow-Origin` and `Access-Control-Expose-Headers`?** (Answer: The first allows the browser to *receive* the response; the second allows the frontend code to *read* specific custom headers from that response).

# References

- [MDN Web Docs: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Web.dev: Cross-Origin Resource Sharing](https://web.dev/cross-origin-resource-sharing/)
