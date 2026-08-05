---
id: variant.spring-boot-async-scheduling.spring-boot
question: question.spring-boot-async-scheduling
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

`@Async` submits work to a Spring task executor, while `@Scheduled` runs work through a scheduler. Configure executors deliberately: thread count, queue capacity, names, rejection behavior, and error reporting should match the workload. These annotations are proxy-based, so self-invocation does not trigger asynchronous dispatch. In a multi-instance service, every replica runs local scheduled jobs unless a distributed lock or external scheduler coordinates them.

# Why It Matters

Unbounded executors and duplicate scheduled work can overload dependencies or perform the same business operation repeatedly.

# Code Example

```java
@EnableScheduling
@SpringBootApplication
class Application { }

@Component
class CleanupJob {
  @Scheduled(cron = "0 0 * * * *")
  void removeExpiredRecords() { }
}
```

# Common Mistakes

- **Using the default executor without capacity planning:** Queues or threads can become an outage source.
- **Assuming a scheduled method runs once in a cluster:** Each replica schedules it.

# Follow-up Questions

- **Why can internal `@Async` calls be synchronous?** (Answer: They bypass the Spring proxy.)
- **How coordinate cluster-wide jobs?** (Answer: Use distributed locking or an external scheduler.)
