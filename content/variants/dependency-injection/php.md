---
id: variant.dependency-injection.php
question: question.dependency-injection
technology: tech.php
---
# Expected Answer (PHP 8.5)

In modern PHP, Dependency Injection is handled by a **Service Container** (IoC container).

1.  **Constructor Injection**: The preferred method. The container uses reflection to automatically instantiate and inject dependencies.
2.  **Laravel Service Container**: Allows binding interfaces to concrete implementations via Service Providers.
3.  **Symfony DependencyInjection Component**: Uses YAML, XML, or PHP configuration to define how services are instantiated.
4.  **Service Lifetimes**:
    *   **Singleton**: The container resolves the dependency once and returns the same instance for the rest of the request cycle.
    *   **Transient (Binding)**: A new instance is created every time it is resolved.
    *   **Scoped**: In PHP (Shared Nothing), most services are effectively scoped to the single HTTP request by default.

# Why It Matters

PHP started as a script-based language but evolved into a robust enterprise language. DI is critical for decoupling web applications, allowing for easier testing (e.g., swapping a real mailer for a `MockMailer`) and managing the "shared nothing" architecture of PHP.

# Code Example

```php
// Laravel Constructor Injection
namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
}
```

# Common Mistakes

-   **Using the Service Locator pattern**: Calling the container directly (e.g., `app('service')` or `$container->get('service')`) inside a class. This hides dependencies and makes testing harder.
-   **Static methods for business logic**: Relying on static methods instead of injected services prevents mocking and leads to tight coupling.

# Follow-up Questions

-   **Binding Interfaces**: How do you tell the container which implementation to use for an interface? (Answer: In Laravel, using `$this->app->bind(Interface::class, Implementation::class)` in a Service Provider).
-   **Singleton vs Transient**: How are they handled in PHP? (Answer: Most services are singletons within the scope of a single request).
---
