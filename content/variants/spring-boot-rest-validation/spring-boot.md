---
id: variant.spring-boot-rest-validation.spring-boot
question: question.spring-boot-rest-validation
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Bind request data to a dedicated DTO and validate it with Jakarta Bean Validation using `@Valid`. Controllers should translate an HTTP request into a valid application command, while services own domain rules and persistence. Do not expose JPA entities as public contracts by default because lazy fields, persistence concerns, and future schema changes leak through the API.

# Why It Matters

Boundary validation gives clients clear errors and protects domain and database code from malformed input.

# Code Example

```java
record CreateUserRequest(@NotBlank @Email String email) {}
@RestController
class UserController {
  @PostMapping("/users")
  ResponseEntity<Void> create(@Valid @RequestBody CreateUserRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }
}
```

# Common Mistakes

- **Binding a persistence entity directly:** Client fields can affect persistence state unexpectedly.
- **Skipping `@Valid`:** Constraints are never invoked for the request body.

# Follow-up Questions

- **Where should a duplicate-email rule live?** (Answer: In domain/service logic, typically producing a conflict.)
- **What status fits malformed input?** (Answer: 400 Bad Request.)
