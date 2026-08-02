---
id: variant.k8s-configmaps-vs-secrets.kubernetes
question: question.k8s-configmaps-vs-secrets
technology: tech.kubernetes
---
# Expected Answer

**ConfigMaps** and **Secrets** are both used to decouple configuration from the container image, but they serve different security needs.

- **ConfigMaps** are for plain-text, non-sensitive data like `LOG_LEVEL=info` or a `nginx.conf` file.
- **Secrets** are for sensitive data like database passwords or API keys. The main technical difference is that Secret values are **Base64 encoded** (obfuscated) and are stored in a slightly more restricted way in the cluster.

Both can be injected into a container as **environment variables** or mounted as **files** in a volume.

# Why It Matters

Using these objects allows you to follow the "Build once, deploy anywhere" principle. You can use the exact same Docker image for development, staging, and production, only swapping out the ConfigMap and Secret for each environment. This reduces bugs caused by environment differences.

# Example Code

### Using a ConfigMap in a Pod
```yaml
spec:
  containers:
  - name: my-app
    image: my-app:latest
    env:
    - name: DATABASE_URL
      valueFrom:
        configMapKeyRef:
          name: my-config
          key: db_url
    - name: API_KEY
      valueFrom:
        secretKeyRef:
          name: my-secret
          key: api_key
```

# Common Mistakes

- **Thinking Secrets are Encrypted by Default:** Base64 is NOT encryption; it is just encoding. Anyone with `kubectl` access to the secret can decode it instantly (`echo "base64-string" | base64 --decode`).
- **Committing Secrets/ConfigMaps to Git:** You should manage the *templates* in Git, but the actual values (especially secrets) should be managed via a secure CI/CD process or a secret manager.
- **Environment Variable Stale Data:** If you update a ConfigMap, environment variables in the container will **not** update until the container is restarted. Files mounted via volumes *will* eventually update.

# Follow-up Questions

- **How do you decode a secret via CLI?** (Answer: `kubectl get secret my-secret -o jsonpath='{.data.key-name}' | base64 --decode`).
- **What is the size limit for a ConfigMap/Secret?** (Answer: 1 MiB. For larger configurations, you should use a different storage mechanism).
- **Can a Pod use a ConfigMap from a different Namespace?** (Answer: No, ConfigMaps and Secrets are namespaced objects and can only be used by Pods in the same namespace).

# References

- [Kubernetes Documentation: ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)
- [Kubernetes Documentation: Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
