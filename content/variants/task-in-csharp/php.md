---
id: variant.task-in-csharp.php
question: question.dotnet-task
technology: tech.php
---
# Expected Answer (PHP 8.5)

PHP does not have a `Task` object or `async/await` built into the language. However, it has **Fibers** (PHP 8.1+) and several libraries that provide similar functionality.

1. **Fibers**: Low-level coroutines that allow pausing and resuming execution. They are the "building blocks" for async frameworks.
2. **ReactPHP / Amp**: Frameworks that provide a `Promise` or `Future` object, which is the functional equivalent of C#'s `Task`.
3. **Swoole**: A C-based extension that provides high-performance coroutines and "Auto-hooking" for I/O functions.

# Why It Matters

Because PHP is "Shared Nothing" and traditionally synchronous, I/O-bound tasks (like 10 concurrent API calls) usually happen sequentially. Using an async framework or Swoole allows PHP to handle these tasks concurrently, significantly reducing response times.

# Code Example

```php
// Using ReactPHP (Functional equivalent of Task)
$loop = React\EventLoop\Loop::get();

$promise = someAsyncOperation();

$promise->then(function ($result) {
    echo "Done: " . $result;
});

$loop->run();
```

# Common Mistakes

-   **Expecting magic**: Fibers do not make your code asynchronous automatically. You must use a loop or a framework that knows how to yield control during I/O.
-   **Mixing Async and Sync**: Using a blocking function (like `sleep()`) inside an event loop stops *everything*.

# Follow-up Questions

-   **What is an Event Loop?** (Answer: A loop that checks for completed I/O events and executes the corresponding callbacks).
-   **Swoole vs ReactPHP?** (Answer: Swoole is a PHP extension (C-speed); ReactPHP is pure PHP).
---
