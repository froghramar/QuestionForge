---
id: variant.k8s-ingress-vs-loadbalancer.kubernetes
question: question.k8s-ingress-vs-loadbalancer
technology: tech.kubernetes
---
# Expected Answer

The main difference is **scope** and **cost**.

- A **LoadBalancer Service** is a Layer 4 (TCP/UDP) construct. Every time you create one, your cloud provider provisions a new, expensive external Load Balancer with its own IP. It just forwards traffic directly to your service.
- An **Ingress** is a Layer 7 (HTTP/HTTPS) construct. It acts as a smart router. You typically have **one** Ingress Controller (which itself is backed by a single LoadBalancer service) that uses rules to route traffic to many different internal services based on the URL path or hostname.

**Summary:** Use a LoadBalancer service for non-HTTP traffic or for a single simple app. Use an Ingress for web applications with multiple services to save money and gain advanced routing features like SSL termination and path-based routing.

# Why It Matters

In a microservices architecture with 50 services, creating 50 `LoadBalancer` services would cost thousands of dollars per month in cloud fees. An Ingress allows you to run all 50 services behind a single Cloud Load Balancer, significantly reducing costs and simplifying DNS management.

# Example Code

### An Ingress Resource (Routing to two services)
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
spec:
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
      - path: /shop
        pathType: Prefix
        backend:
          service:
            name: shop-service
            port:
              number: 80
```

# Common Mistakes

- **Forgetting the Ingress Controller:** Creating an Ingress resource and wondering why it has no "Address." You must install a controller (like NGINX) first.
- **Path matching confusion:** Not understanding the difference between `Exact` and `Prefix` path matching, leading to 404s.
- **SSL Misconfiguration:** Forgetting to define a TLS secret in the Ingress, resulting in "Not Secure" browser warnings even if the backend supports HTTPS.

# Follow-up Questions

- **What is an Ingress Controller?** (Answer: A Pod (usually NGINX or HAProxy) that watches the Kubernetes API for Ingress resources and updates its configuration to route traffic accordingly).
- **Can an Ingress handle non-HTTP traffic (like databases)?** (Answer: Generally no. Ingress is designed for HTTP/S. For TCP/UDP, you should use a LoadBalancer service or specialized controller features).
- **What is a "Default Backend"?** (Answer: A service that handles all requests that don't match any rule in the Ingress).

# References

- [Kubernetes Documentation: Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Kubernetes Documentation: Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)
