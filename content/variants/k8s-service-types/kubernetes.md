---
id: variant.k8s-service-types.kubernetes
question: question.k8s-service-types
technology: tech.kubernetes
---
# Expected Answer

Kubernetes **Services** provide a stable network identity (IP and DNS name) for a set of Pods. The four main types are:

1.  **ClusterIP (Default):** Exposes the Service on a cluster-internal IP. Use this for internal communication between microservices.
2.  **NodePort:** Exposes the Service on each Node's IP at a static port (usually 30000-32767). You can reach the service from outside by calling `<NodeIP>:<NodePort>`.
3.  **LoadBalancer:** Exposes the Service externally using a cloud provider's load balancer (e.g., AWS ELB, GCP LB). It automatically creates a NodePort and ClusterIP for you.
4.  **ExternalName:** Maps the Service to the contents of the `externalName` field (e.g., `my.database.example.com`), by returning a CNAME record.

# Why It Matters

Using the wrong service type can lead to security vulnerabilities (unintentionally exposing a private DB) or architectural complexity. Most production environments use **ClusterIP** for internal traffic and an **Ingress Controller** (which sits on top of a LoadBalancer service) to manage external traffic.

# Example Code

### A LoadBalancer Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-web-service
spec:
  type: LoadBalancer
  selector:
    app: my-web-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

# Common Mistakes

- **Using NodePort for production:** It’s hard to manage because you need to track Node IPs and it opens up a wide range of ports on your servers.
- **Forgetting the Selector:** If the `selector` doesn't match the Pod labels, the Service will have no endpoints and will return 404/Timeout.
- **Not using Ingress for multiple services:** Creating a separate `LoadBalancer` service for every single microservice is expensive and hard to manage (use one Ingress instead).

# Follow-up Questions

- **What is an Ingress?** (Answer: An API object that manages external access to the services in a cluster, typically HTTP. It provides load balancing, SSL termination, and name-based virtual hosting).
- **What is a Headless Service?** (Answer: A Service with `clusterIP: None`. It doesn't provide a single IP, but instead returns the A records (IPs) for all the backing Pods. Used for stateful applications like databases).
- **What is a TargetPort?** (Answer: The port on which the application inside the container is listening).

# References

- [Kubernetes Documentation: Service](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Kubernetes Documentation: Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
