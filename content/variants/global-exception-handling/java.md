---
id: variant.global-exception-handling.java
question: question.global-exception-handling
technology: tech.java
---
# Expected Answer (Java 26 / Spring Boot)

In Spring Boot, global exception handling is primarily done using the **`@ControllerAdvice`** and **`@ExceptionHandler`** annotations.

**Real-time Example**: Creating a `RestResponseEntityExceptionHandler` that catches `EntityNotFoundException` and returns a `404 Not Found` with a custom error body.

# Why It Matters

Centralized error handling ensures that no matter where an error occurs in your application, the client always gets a consistent, secure, and clean response. It avoids the need for repetitive `try-catch` blocks in every controller method.

# Code Example

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = { IllegalArgumentException.class })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        String bodyOfResponse = "Invalid arguments provided.";
        return new ResponseEntity<>(bodyOfResponse, HttpStatus.BAD_REQUEST);
    }
}
```

# Common Mistakes

-   **Catching `Exception.class`**: Catching the root Exception class can hide bugs and prevent specific handlers from running. Always try to catch specific exceptions.
-   **Security Leaks**: Returning the internal error message or stack trace to the user, which might reveal database structure or library versions.

# Follow-up Questions

-   **`ErrorController` vs `@ControllerAdvice`?** (Answer: `ErrorController` handles errors outside of the Spring MVC context, like 404s for non-existent routes).
-   **What is `ProblemDetail`?** (Answer: Introduced in Spring Boot 3 / RFC 7807, it's the standardized way to return API error details).
