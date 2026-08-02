---
id: variant.k8s-deployment-strategies.kubernetes
question: question.k8s-deployment-strategies
technology: tech.kubernetes
---
# Expected Answer

Kubernetes provides two built-in ways to update your application:

1.  **RollingUpdate (Default):** This strategy replaces old Pods with new ones one-by-one (or in small batches). It provides **zero downtime** because some Pods are always available to serve traffic. However, you must ensure your application and database can handle two different versions running at the same time.
2.  **Recreate:** This strategy kills all old Pods first, and only then starts the new ones. This results in **downtime**, but it guarantees that you never have two different versions of your code running simultaneously.

# Why It Matters

Most modern web applications use `RollingUpdate` to avoid interrupting users. However, if your application is a legacy singleton that cannot have two instances running (e.g., due to file locking or a non-backward-compatible DB migration), you might be forced to use `Recreate`.

# Example Code

### Configuring a RollingUpdate
```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%       # Create 25% more pods during update
      maxUnavailable: 0   # Don't kill any old pods until new ones are ready
```

### Configuring a Recreate Strategy
```yaml
spec:
  strategy:
    type: Recreate
```

# Common Mistakes

- **Setting `maxUnavailable` to 100%:** This effectively turns a RollingUpdate into a Recreate strategy with downtime.
- **Forgetting Readiness Probes:** If you don't have readiness probes, Kubernetes will assume a new Pod is "ready" as soon as the process starts, killing the old Pod before the new one is actually able to handle requests.
- **Not considering Database Migrations:** Rolling out a new version that requires a breaking DB change using `RollingUpdate` will crash the old Pods that are still running.

# Follow-up Questions

- **How do you undo a failed deployment?** (Answer: Using `kubectl rollout undo deployment/<name>`).
- **What is the difference between Blue/Green and Canary?** (Answer: Blue/Green switches 100% of traffic at once after the new version is tested. Canary sends a tiny slice of traffic to the new version first to "test the waters" in production).
- **What is `maxSurge`?** (Answer: The number of extra Pods that can be created above the desired replica count during an update).

# References

- [Kubernetes Documentation: Updating a Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment)
- [Weaveworks: Deployment Strategies](https://www.weave.works/blog/kubernetes-deployment-strategies)
