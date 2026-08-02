---
id: variant.dotnet-disposal.php
question: question.dotnet-disposal
technology: tech.php
---
# Expected Answer (PHP 8.5)

In PHP, resource management is handled via reference counting and the Garbage Collector, with a specific focus on the request lifecycle.

1.  **Destructors (`__destruct`)**: Automatically called when there are no more references to an object, or during the script shutdown.
2.  **Explicit Cleanup**: Because PHP scripts are usually short-lived (one request), most resources (memory, DB connections) are automatically freed at the end of the request.
3.  **RAII Pattern**: Using the destructor to close file handles or network sockets.

# Why It Matters

In long-running CLI scripts or environments like RoadRunner/Swoole, failing to explicitly manage resources can lead to memory leaks and exhausted file descriptors, as the process does not exit after every request.

# Code Example

```php
class FileManager
{
    private $handle;

    public function __construct($filename)
    {
        $this->handle = fopen($filename, 'w');
    }

    public function __destruct()
    {
        if ($this->handle) {
            fclose($this->handle);
        }
    }
}
```

# Common Mistakes

-   **Relying on `__destruct` for critical timing**: You cannot guarantee *exactly* when `__destruct` will be called in a complex object graph with circular references.
-   **Circular References**: Before PHP 5.3, circular references caused memory leaks. Modern PHP handles this with a cycle collector, but it still has a performance cost.

# Follow-up Questions

-   **What is the 'gc_collect_cycles' function?** (Answer: It forces the collection of any existing garbage cycles).
-   **How does PHP handle DB connections at the end of a script?** (Answer: Standard PDO connections are closed automatically when the script ends, unless persistent connections are used).
---
