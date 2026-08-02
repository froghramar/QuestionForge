---
id: variant.put-vs-patch.java
question: question.put-vs-patch
technology: tech.java
---
# Expected Answer (Java 26 / Spring Boot)

In Spring Boot REST APIs:

1. **PUT (`@PutMapping`)**: Replaces the entire resource. The request body is typically mapped to a DTO containing all fields.
2. **PATCH (`@PatchMapping`)**: Performs a partial update.

**Real-time Example**:
- **PUT**: Updating a User's full details.
- **PATCH**: Updating just the user's `lastLogin` timestamp.

# Why It Matters

Using the correct HTTP method makes your API predictable and follows the principle of least astonishment. PUT is strictly for replacement; PATCH is for modification. This affects how caches and proxies treat the requests.

# Code Example

```java
// PUT: Full update
@PutMapping("/users/{id}")
public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO userDto) {
    User user = service.update(id, userDto); // Replaces all fields
    return ResponseEntity.ok(user);
}

// PATCH: Partial update (often using Map to capture only provided fields)
@PatchMapping("/users/{id}")
public ResponseEntity<User> patchUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
    User user = service.partialUpdate(id, updates);
    return ResponseEntity.ok(user);
}
```

# Common Mistakes

-   **Using PUT like PATCH**: Omitting fields in a PUT request body and expecting them to remain unchanged (they should usually become null).
-   **Ignoring Idempotency**: Implementing a PUT that has side effects beyond updating the record (PUT should be idempotent).

# Follow-up Questions

-   **How to handle JSON Patch in Spring?** (Answer: By using libraries like `json-patch` that allow applying RFC 6902 operations to Java objects).
-   **Validation**: How do you validate a PATCH request? (Answer: Often harder than PUT because you need to validate only the fields that were actually sent).
