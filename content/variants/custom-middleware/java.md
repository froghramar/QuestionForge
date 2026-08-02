---
id: variant.custom-middleware.java
question: question.custom-middleware
technology: tech.java
---
# Expected Answer (Java 26 / Spring Boot)

In the Java Spring ecosystem, the equivalent of middleware is a **Filter** (Servlet API) or an **Interceptor** (Spring MVC).

- **Servlet Filter**: Operates at the lowest level of the web request.
- **HandlerInterceptor**: Higher level, has access to the Spring `Handler` and `ModelAndView`.

**Real-time use case**: A "Logging Filter" that logs every incoming request's method and URI before it reaches the controller.

# Why It Matters

Filters allow you to implement cross-cutting concerns (logging, security, CORS, compression) in a centralized way. This keeps your business logic (Controllers) clean and focused on their primary task.

# Code Example

```java
@Component
public class RequestLoggingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
            throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest) request;
        System.out.println("Request: " + req.getMethod() + " " + req.getRequestURI());
        
        // Pass to the next filter in the chain
        chain.doFilter(request, response);
    }
}
```

# Common Mistakes

-   **Order of execution**: Using `@Order` or `FilterRegistrationBean` to ensure security filters run before logging filters.
-   **Blocking the chain**: Forgetting to call `chain.doFilter()`, which will stop the request from ever reaching your Controller.

# Follow-up Questions

-   **Filter vs Interceptor?** (Answer: Filters are part of the Servlet container; Interceptors are part of the Spring Framework and have access to Spring-specific metadata).
-   **OncePerRequestFilter**: Why use it? (Answer: To ensure a filter is executed exactly once per request, even if there are internal forwards or includes).
