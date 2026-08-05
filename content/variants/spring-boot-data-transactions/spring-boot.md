---
id: variant.spring-boot-data-transactions.spring-boot
question: question.spring-boot-data-transactions
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Put `@Transactional` on a service method that represents one atomic business operation. Spring opens and commits or rolls back the transaction through a proxy when an external caller invokes that bean method. Runtime exceptions trigger rollback by default; configure rollback behavior explicitly for checked exceptions when needed. Keep the transaction short and avoid network calls while database locks may be held.

# Why It Matters

Correct transaction boundaries prevent partial business updates and reduce lock contention.

# Code Example

```java
@Service
class TransferService {
  @Transactional
  void transfer(Account from, Account to, BigDecimal amount) {
    from.debit(amount); to.credit(amount);
  }
}
```

# Common Mistakes

- **Calling a transactional method from the same instance:** The proxy is bypassed and no transaction is started.
- **Wrapping remote calls in a long transaction:** Locks and failures propagate unnecessarily.

# Follow-up Questions

- **Why service-level transactions?** (Answer: They align with business operations across repositories.)
- **What rolls back by default?** (Answer: Unchecked exceptions.)
