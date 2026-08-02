---
id: variant.k8s-hpa.kubernetes
question: question.k8s-hpa
technology: tech.kubernetes
---
# Expected Answer

The **Horizontal Pod Autoscaler (HPA)** automatically adjusts the number of replicas in a Deployment based on CPU or Memory usage.

To make it work:
1.  **Metrics Server:** You must have the Metrics Server installed in your cluster.
2.  **Resource Requests:** You **must** define CPU/Memory `requests` in your Pod template. The HPA calculates percentage based on these requests (e.g., "scale up if CPU is > 80% of what I requested").
3.  **HPA Object:** You create an HPA resource that points to your Deployment and sets the min/max replicas and the target metric.

# Why It Matters

HPA allows your application to handle sudden spikes in traffic (like a Black Friday sale) without manual intervention, and then scale back down to save costs when traffic is low. It is a fundamental part of building cloud-native, cost-effective systems.

# Example Code

### An HPA targeting a Deployment
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
```

# Common Mistakes

- **No Resource Requests:** The HPA will never scale because it doesn't have a baseline to compare against.
- **Flapping:** Setting the target utilization too low, causing the cluster to constantly add and remove Pods. (Solution: Use `behavior` settings to slow down scale-down operations).
- **Metric Server Missing:** The HPA will stay in a `<unknown>` state.
- **Scaling by Memory only:** Memory usage often grows but rarely shrinks (due to GC behavior), which can lead to the HPA scaling up but never scaling back down.

# Follow-up Questions

- **What is the difference between HPA and VPA?** (Answer: HPA (Horizontal) adds more Pods. VPA (Vertical) makes the existing Pods bigger by increasing their CPU/Memory requests).
- **Can you scale based on custom metrics (like HTTP requests per second)?** (Answer: Yes, but it requires a custom metrics adapter, like the Prometheus Adapter or KEDA).
- **What is the Cluster Autoscaler?** (Answer: It scales the number of **Nodes** in your cluster when Pods cannot be scheduled due to lack of resources).

# References

- [Kubernetes Documentation: Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Kubernetes Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
