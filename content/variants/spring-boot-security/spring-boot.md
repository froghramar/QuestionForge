---
id: variant.spring-boot-security.spring-boot
question: question.spring-boot-security
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Configure security with a `SecurityFilterChain` that states which routes are public and which require authentication. Authentication establishes the caller identity; authorization checks whether that identity may take the action. Choose session, bearer-token, and CSRF controls based on the client and threat model rather than disabling defaults broadly. Add method-level checks for sensitive service operations that could be reached through multiple paths.

# Why It Matters

An explicit filter policy prevents accidental public endpoints and makes authorization reviewable.

# Code Example

```java
@Bean
SecurityFilterChain security(HttpSecurity http) throws Exception {
  return http.authorizeHttpRequests(auth -> auth
      .requestMatchers("/actuator/health").permitAll()
      .anyRequest().authenticated())
    .httpBasic(Customizer.withDefaults()).build();
}
```

# Common Mistakes

- **Disabling CSRF without understanding browser sessions:** Cookie-authenticated state changes can become vulnerable.
- **Using only URL rules for sensitive actions:** Alternate entry points can miss required policy.

# Follow-up Questions

- **When is CSRF relevant?** (Answer: Usually for browser clients using automatically sent credentials such as cookies.)
- **What does `authenticated()` guarantee?** (Answer: Identity is established, not necessarily resource-level permission.)
