---
id: variant.k8s-requests-vs-limits.kubernetes
question: question.k8s-requests-vs-limits
technology: tech.kubernetes
---
# Expected Answer

**Requests** and **Limits** are how Kubernetes manages hardware resources for containers.

- **Requests** represent what the container is *guaranteed* to get. The scheduler uses requests to find a node with enough available space. If a Pod requests 2GB of RAM, it will only be placed on a node that has 2GB of unreserved RAM.
- **Limits** represent the *ceiling*. It’s the maximum amount the container can use.
    - If a container hits its **CPU limit**, it is **throttled** (slowed down), but it keeps running.
    - If a container hits its **Memory limit**, it is **OOM Killed** (Out of Memory) by the kernel and usually restarted by Kubernetes.

# Why It Matters

If you don't set requests, the scheduler might over-provision a node, leading to resource contention. If you don't set limits, a single buggy container (with a memory leak) can consume all the memory on a node, causing the kubelet to crash or other Pods to be evicted.

# Example Code

### Resource Specification in a Deployment
```yaml
spec:
  containers:
  - name: my-app
    image: my-app:latest
    resources:
      requests:
        memory: "256Mi"
        cpu: "500m" # 0.5 cores
      limits:
        memory: "512Mi"
        cpu: "1" # 1 full core
```

# Common Mistakes

- **Setting CPU requests too high:** This wastes money because the scheduler reserves that CPU even if the app isn't using it.
- **Setting Memory limits too low:** Causing constant OOM kill loops because the app needs more memory than the limit just to start up (e.g., JVM apps).
- **Not setting any limits:** A "BestEffort" Pod is the first one killed when a node runs out of memory.

# Follow-up Questions

- **What is a "millicore" (m)?** (Answer: 1/1000th of a CPU core. `250m` is 25% of a core).
- **What is the difference between MiB and MB?** (Answer: MiB (Mebibyte) is base-2 (1024 bytes), while MB (Megabyte) is base-10 (1000 bytes). Kubernetes uses Mi/Gi which are power-of-two units).
- **What happens if a Pod's memory request is higher than any single node's total memory?** (Answer: The Pod will remain in a `Pending` state indefinitely because it cannot be scheduled).

# References

- [Kubernetes Documentation: Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
