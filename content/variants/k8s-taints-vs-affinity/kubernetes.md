---
id: variant.k8s-taints-vs-affinity.kubernetes
question: question.k8s-taints-vs-affinity
technology: tech.kubernetes
---
# Expected Answer

While both are used to control Pod placement, they work from opposite directions:

- **Taints and Tolerations** are used to **repel** Pods from nodes. You "taint" a node (e.g., `dedicated=gpu:NoSchedule`), and only Pods that have a matching "toleration" can live there. This is best for dedicating nodes to specific workloads or users.
- **Node Affinity** is used to **attract** Pods to nodes. You define rules on the Pod that say "I want to run on nodes with the label `disk=ssd`." This is best for meeting specific hardware or resource requirements of an application.

To **dedicate** a node exclusively to a specific app, you use **both**: Taint the node so others can't use it, and give the app both a Toleration (to enter the node) and Node Affinity (to ensure it stays there).

# Why It Matters

Using only Node Affinity doesn't stop other, unrelated Pods from being scheduled on your specialized (and likely expensive) GPU nodes. You need Taints to keep the riff-raff out and Node Affinity to make sure your GPU-app actually finds those nodes.

# Example Code

### 1. Tainting a Node (via CLI)
`kubectl taint nodes node1 gpu=true:NoSchedule`

### 2. A Pod with Toleration AND Affinity
```yaml
spec:
  containers:
  - name: gpu-worker
    image: gpu-worker:latest
  tolerations:
  - key: "gpu"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: gpu
            operator: In
            values:
            - "true"
```

# Common Mistakes

- **Only using Node Affinity:** Allowing general-purpose Pods to "steal" resources on specialized nodes.
- **Forgetting the `NoExecute` effect:** The `NoExecute` taint will immediately evict any Pods currently on the node that don't have a toleration, whereas `NoSchedule` only affects new Pods.
- **Operator Confusion:** Using `Equal` when you meant `Exists` in the toleration.

# Follow-up Questions

- **What is Pod Anti-Affinity?** (Answer: A rule that prevents two Pods of the same type from running on the same node, ensuring that a single node failure doesn't take down all replicas of a service).
- **What happens if a Pod has multiple Node Affinity rules?** (Answer: All rules must be satisfied (logical AND) for the Pod to be scheduled on a node).
- **Can you taint a Node to stop it from accepting any new Pods during maintenance?** (Answer: Yes, using the `node.kubernetes.io/unschedulable` taint, which is what `kubectl cordon` does).

# References

- [Kubernetes Documentation: Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)
- [Kubernetes Documentation: Assigning Pods to Nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)
