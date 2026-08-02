---
id: variant.cmd-vs-entrypoint.docker
question: question.cmd-vs-entrypoint
technology: tech.docker
---
# Expected Answer

The difference lies in how they handle arguments passed to `docker run`.

- **`CMD`** defines the default command or arguments. If you provide an argument to `docker run`, it **replaces** the entire `CMD` instruction.
- **`ENTRYPOINT`** defines the command that *will* run. If you provide arguments to `docker run`, they are **appended** to the `ENTRYPOINT` command.

**Best Practice:** Use them together. Use `ENTRYPOINT` for the executable and `CMD` for the default arguments.

Example:
```dockerfile
ENTRYPOINT ["git"]
CMD ["--help"]
```
- `docker run my-git` runs `git --help`.
- `docker run my-git pull` runs `git pull`.

# Why It Matters

Using `ENTRYPOINT` makes your image behave like a specialized tool. Using the **exec form** (JSON array syntax) is critical because it allows the application to be PID 1, meaning it will correctly receive Unix signals like `SIGTERM` from `docker stop`, allowing for a graceful shutdown.

# Example Code

### Exec Form (Preferred)
```dockerfile
# Responds to SIGTERM
ENTRYPOINT ["node", "server.js"]
```

### Shell Form (Avoid)
```dockerfile
# Runs as /bin/sh -c "node server.js"
# Does NOT receive SIGTERM directly
ENTRYPOINT node server.js
```

# Common Mistakes

- **Using Shell Form:** This wraps your command in a shell, which doesn't pass signals to the underlying process. Your app won't shut down gracefully and will be killed after a 10-second timeout.
- **Using `CMD` for mandatory commands:** Users can accidentally override `CMD` and break the container.
- **Confusing `COPY` and `ADD`:** Using `ADD` to copy local files when `COPY` is more explicit and safer.

# Follow-up Questions

- **How do you override the `ENTRYPOINT`?** (Answer: Use the `--entrypoint` flag in `docker run`).
- **What happens if you have multiple `CMD` instructions?** (Answer: Only the last one takes effect).
- **Why is the JSON array syntax called "Exec Form"?** (Answer: Because it calls `exec` directly without spawning a shell).

# References

- [Docker Documentation: CMD](https://docs.docker.com/engine/reference/builder/#cmd)
- [Docker Documentation: ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint)
