---
id: variant.dependency-injection.java
question: question.dependency-injection
technology: tech.java
---
# Expected Answer (Java 26)

In the Java ecosystem, Dependency Injection is primarily associated with **Spring Framework** and **Jakarta EE (CDI)**.

1.  **Spring Context**: The IoC container manages beans and their dependencies.
2.  **Annotation-Driven**: Uses `@Autowired` (Spring) or `@Inject` (Jakarta EE) to resolve dependencies.
3.  **Service Lifetimes (Scopes)**:
    *   **Singleton**: One instance per Spring container. The same instance is injected into all dependent beans. (Default).
    *   **Prototype**: A new instance is created every time the bean is requested from the container.
    *   **Request**: A new instance is created for each HTTP request (only valid in web-aware Spring contexts). Similar to .NET's "Scoped".
    *   **Session**: A new instance is created for each HTTP session.

# Why It Matters

Java enterprise applications rely heavily on DI to manage complexity. Spring's implementation of IoC allows for decoupled architectures where infrastructure (like DB transactions) can be injected via AOP (Aspect Oriented Programming) without polluting business logic.

# Code Example

```java
// Spring Framework Constructor Injection
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired // Optional in modern Spring for constructor injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

# Common Mistakes

-   **Field Injection**: Using `@Autowired` on private fields makes unit testing difficult without a Spring context. Constructor injection is the recommended best practice.
-   **Circular Dependencies**: Spring will throw a `BeanCurrentlyInCreationException` if two beans depend on each other via constructors.

# Follow-up Questions

-   **Constructor vs Field Injection?** (Answer: Constructor injection ensures required dependencies are present and allows for `final` fields).
-   **What is a BeanPostProcessor?** (Answer: An interface that allows for custom modification of new bean instances).
