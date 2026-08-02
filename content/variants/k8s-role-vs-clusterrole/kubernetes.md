---
id: variant.k8s-role-vs-clusterrole.kubernetes
question: question.k8s-role-vs-clusterrole
technology: tech.kubernetes
---
# Expected Answer

The difference lies in their **scope**:

- A **Role** is namespaced. It defines permissions within a single namespace (e.g., "can delete pods in the `dev` namespace"). You must always specify the namespace when creating a Role.
- A **ClusterRole** is non-namespaced. It can be used to:
    1. Define permissions for cluster-scoped resources (like Nodes or Namespaces).
    2. Define permissions for namespaced resources (like Pods) that apply across **all** namespaces.

To grant these permissions, you use a **RoleBinding** (to grant a Role or ClusterRole within one namespace) or a **ClusterRoleBinding** (to grant a ClusterRole cluster-wide).

# Why It Matters

Using a ClusterRole when a Role would suffice violates the **Principle of Least Privilege**. If a ServiceAccount with a ClusterRoleBinding is compromised, the attacker has access to every namespace in the cluster. With a simple RoleBinding, they are trapped within a single namespace.

# Example Code

### 1. A Namespaced Role
```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: my-app-ns
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

### 2. A RoleBinding (Linking a User to the Role)
```yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: read-pods
  namespace: my-app-ns
subjects:
- kind: User
  name: "jane@example.com"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

# Common Mistakes

- **Using ClusterRoleBinding for an app:** Giving a microservice cluster-wide permissions when it only needs to talk to the API within its own namespace.
- **Granting `*` (All) permissions:** Using the wildcard verb or resource instead of being explicit.
- **Confusing User vs. ServiceAccount:** Trying to find a "User" object in Kubernetes; users are managed by your identity provider (like OIDC), while ServiceAccounts are native Kubernetes objects.

# Follow-up Questions

- **Can you use a RoleBinding to bind a ClusterRole?** (Answer: Yes. This is a common pattern to grant permissions defined in a reusable ClusterRole to a user *only* within a specific namespace).
- **What is the `system:masters` group?** (Answer: A built-in group that has unrestricted access to the entire cluster, bypassing RBAC).
- **How do you audit who performed an action?** (Answer: By enabling Kubernetes Audit Logs, which record every request made to the API server, including the subject and the decision made by RBAC).

# References

- [Kubernetes Documentation: Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
