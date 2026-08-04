---
id: variant.python-generators.python
question: question.python-generators
technology: tech.python
---
# Expected Answer (Python 3.14)

A generator is a lazy iterator. Calling a generator function does not run its body to completion; it returns a generator object. Each `next()` call resumes execution until the next `yield`, preserving local state between values.

```python
def read_nonempty_lines(lines):
    for line in lines:
        line = line.strip()
        if line:
            yield line

lines = read_nonempty_lines([" first ", "", "second"])
assert next(lines) == "first"
assert list(lines) == ["second"]
```

Compared with a list, a generator can process a large or unbounded input with low peak memory. The trade-off is that it is typically consumed once and each item is available only when iteration reaches it.

# Why It Matters

Generators are common in file processing, pagination, streaming responses, and data pipelines. Choosing one thoughtfully can avoid loading an entire dataset into memory while keeping processing composable.

# Common Mistakes

- **Expecting the function body to run when called:** It begins running when the generator is first advanced.
- **Iterating over an exhausted generator again:** A generator keeps its position and normally cannot be rewound.
- **Using a generator where random access is needed:** Generators do not provide indexing or a known length without consuming values.

# Follow-up Questions

- **What protocol makes an object iterable?** (Answer: It provides `__iter__()` that returns an iterator; iterators also provide `__next__()`.)
- **How does `yield from` help?** (Answer: It delegates yielding to another iterable or generator.)
