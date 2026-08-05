---
id: variant.spring-boot-exception-handling.spring-boot
question: question.spring-boot-exception-handling
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Use `@RestControllerAdvice` with `@ExceptionHandler` methods to map application exceptions to consistent, client-safe responses. Return precise status codes for expected failures, log unexpected failures with request context, and never expose stack traces or database errors. `ProblemDetail` provides a standard structured response body for HTTP API errors.

# Why It Matters

Central handling keeps clients predictable and prevents sensitive internal details from escaping.

# Code Example

```java
@RestControllerAdvice
class ApiErrors {
  @ExceptionHandler(IllegalArgumentException.class)
  ProblemDetail invalid(IllegalArgumentException error) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Invalid request");
  }
}
```

# Common Mistakes

- **Catching `Exception` in every controller:** Error policy becomes inconsistent and repetitive.
- **Returning `error.getMessage()` for unknown failures:** Internal details may leak.

# Follow-up Questions

- **Why use `ProblemDetail`?** (Answer: It provides a standardized HTTP error representation.)
- **Where should logging happen?** (Answer: Centrally with safe request context.)
