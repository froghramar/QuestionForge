---
id: variant.async-await.php
question: question.async-await
technology: tech.php
---
# Expected Answer (PHP 8.5)

PHP is traditionally synchronous (one process per request). However, it has evolved to support concurrency:

1.  **Fibers (PHP 8.1+)**: The primitive for "green threads." Fibers allow pausing execution without blocking the entire process. They are not "async/await" in the JS sense but provide the foundation for it.
2.  **ReactPHP / Amp**: Libraries that provide event loops and Promises, similar to Node.js.
3.  **Guzzle Promises**: Often used for concurrent HTTP requests.
4.  **Swoole / RoadRunner**: High-performance application servers that replace standard FPM to enable true asynchronous PHP.

# Why It Matters

PHP's "shared nothing" architecture makes it simple but historically limited for I/O bound tasks (like calling 5 APIs at once). Understanding Fibers and Event Loops allows developers to optimize high-traffic web applications.

# Code Example

```php
// Using Guzzle for concurrent requests (Common PHP Async pattern)
$promises = [
    'user'   => $client->getAsync('/user/1'),
    'posts'  => $client->getAsync('/user/1/posts'),
];

// Wait for all responses to settle
$results = GuzzleHttp\Promise\Utils::unwrap($promises);
```

# Common Mistakes

-   **Blocking the loop**: In an event-loop environment (ReactPHP), using a blocking function like `sleep()` or `file_get_contents()` stops the entire server for all users.
-   **Assuming multi-threading**: PHP Fibers are coroutines, not threads. They run on a single CPU core.

# Follow-up Questions

-   **What is the difference between a Fiber and a Thread?** (Answer: Fibers are managed by the application/runtime and are cooperative; Threads are managed by the OS and are preemptive).
-   **How does RoadRunner improve PHP performance?** (Answer: It keeps the application in memory between requests, avoiding the overhead of booting the framework for every hit).
---
