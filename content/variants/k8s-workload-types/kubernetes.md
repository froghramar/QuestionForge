---
id: variant.k8s-workload-types.kubernetes
question: question.k8s-workload-types
technology: tech.kubernetes
---
# Expected Answer

The choice of controller depends on the nature of the application:

1.  **Deployment** is for **stateless** apps. Pods are treated as "cattle"—if one dies, a new one replaces it with a new name and no memory of the past. It’s perfect for web servers and APIs.
2.  **StatefulSet** is for **stateful** apps like databases (Postgres, MongoDB). Pods are treated as "pets"—each has a unique, stable identity (`app-0`, `app-1`) and a specific persistent volume that follows it if it moves to a different node.
3.  **DaemonSet** ensures that every node in the cluster runs a copy of the Pod. This is used for system-level services like logging agents, monitoring agents, or network plugins.

# Why It Matters

Using a Deployment for a database is a common disaster: if the Pod moves, it might lose its data or its identity, breaking the cluster's consistency. Conversely, using a StatefulSet for a stateless API adds unnecessary complexity to scaling and updates.

# Example Use Cases

- **Deployment:** A React frontend, a Node.js API, a stateless microservice.
- **StatefulSet:** A MySQL cluster, a Redis instance with persistence, a Kafka broker.
- **DaemonSet:** Fluentd (logging), Prometheus Node Exporter (metrics), Calico (networking).

# Common Mistakes

- **Using Deployment for Databases:** Forgetting that Deployments don't guarantee stable network IDs or volume affinity.
- **Overusing StatefulSet:** Using it for things that don't actually need it, which slows down rolling updates (because they happen one-by-one).
- **Forgetting DaemonSet for Infra:** Running a logging agent as a Deployment instead of a DaemonSet, which might result in some nodes not being covered.

# Follow-up Questions

- **How does a StatefulSet handle updates?** (Answer: It updates Pods one at a time, usually in reverse ordinal order, waiting for the previous one to be healthy before moving to the next).
- **What is a "Headless Service" in the context of a StatefulSet?** (Answer: A service without a cluster IP that allows direct DNS resolution of each Pod's individual IP, which is required for peer-to-peer communication in distributed databases).
- **Can you limit a DaemonSet to only specific nodes?** (Answer: Yes, using `nodeSelector` or `nodeAffinity`).

# References

- [Kubernetes Documentation: Workloads](https://kubernetes.io/docs/concepts/workloads/)
- [Kubernetes Documentation: StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
