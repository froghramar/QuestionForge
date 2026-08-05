---
id: variant.spring-boot-testing.spring-boot
question: question.spring-boot-testing
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Choose the smallest test scope that provides confidence. Plain unit tests are fastest for domain logic. Use `@WebMvcTest` for controller and MVC behavior with mocked collaborators, `@DataJpaTest` for persistence behavior, and `@SpringBootTest` only when the full application context or cross-layer integration is needed. Keep external services isolated and test error, authorization, and validation paths as well as success cases.

# Why It Matters

Focused tests give fast feedback, while a smaller number of full-context tests catches real wiring defects without making the suite slow and brittle.

# Code Example

```java
@WebMvcTest(UserController.class)
class UserControllerTest {
  @Autowired MockMvc mvc;
  @Test void rejectsInvalidBody() throws Exception {
    mvc.perform(post("/users").contentType(APPLICATION_JSON).content("{}"))
      .andExpect(status().isBadRequest());
  }
}
```

# Common Mistakes

- **Using `@SpringBootTest` for every test:** The suite is slow and configuration-heavy.
- **Testing only controllers without response assertions:** HTTP status and validation contracts regress unnoticed.

# Follow-up Questions

- **What does `@WebMvcTest` target?** (Answer: The MVC slice around selected controllers.)
- **When use a full context?** (Answer: When integration wiring itself is under test.)
