---
id: variant.python-gil.python
question: question.python-gil
technology: tech.python
---
# Expected Answer (Python 3.14)

The Global Interpreter Lock is a CPython implementation mechanism that normally allows only one thread to execute Python bytecode at a time in a process. As a result, CPU-bound Python code generally does not get parallel speedup from multiple threads in a standard CPython build.

For CPU-bound independent work, use multiple processes or code in an extension that can run without the GIL. For I/O-bound work, threads can still help because waiting on sockets, files, or many blocking system calls releases the GIL. `asyncio` is another good fit when the I/O libraries are asynchronous and high task concurrency is needed.

```python
from concurrent.futures import ProcessPoolExecutor

def count_primes(limit):
    return sum(
        all(candidate % divisor for divisor in range(2, candidate))
        for candidate in range(2, limit)
    )

with ProcessPoolExecutor() as pool:
    results = list(pool.map(count_primes, [10_000, 11_000]))
```

# Why It Matters

Choosing threads for CPU-intensive request processing can add synchronization overhead without increasing throughput. Knowing the distinction lets you choose processes, asynchronous I/O, or a different execution strategy based on the bottleneck.

# Common Mistakes

- **Saying Python has only one thread:** CPython supports many threads; the GIL restricts concurrent Python-bytecode execution.
- **Assuming threads are useless:** They can improve responsiveness and throughput for I/O-bound programs.
- **Treating the GIL as a language rule:** It is historically specific to CPython and does not define all Python implementations or builds.

# Follow-up Questions

- **Why might a C extension improve CPU-bound performance?** (Answer: It can perform native work while releasing the GIL.)
- **What does `multiprocessing` trade for CPU parallelism?** (Answer: It uses separate processes, with added startup, memory, and inter-process communication costs.)
