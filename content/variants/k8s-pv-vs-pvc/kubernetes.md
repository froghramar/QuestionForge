---
id: variant.k8s-pv-vs-pvc.kubernetes
question: question.k8s-pv-vs-pvc
technology: tech.kubernetes
---
# Expected Answer

The relationship between **PersistentVolume (PV)** and **PersistentVolumeClaim (PVC)** is similar to the relationship between a **Node** and a **Pod**.

- A **PV** is the actual storage resource (e.g., a 100GB disk on AWS). It is created by the cluster administrator or a StorageClass.
- A **PVC** is a request for storage by a developer (e.g., "I need 20GB of fast storage").

When a developer creates a PVC, Kubernetes looks for an available PV that meets the requirements and "binds" them. The developer then uses the PVC in their Pod specification without ever needing to know the underlying storage details.

# Why It Matters

This separation allows applications to be **portable**. You can use the same PVC definition in a local Minikube cluster (where it might bind to a local folder) and in a production AWS cluster (where it might bind to an EBS volume), without changing your application's YAML.

# Example Code

### 1. Requesting Storage (PVC)
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-app-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
```

### 2. Using the Storage in a Pod
```yaml
spec:
  containers:
  - name: my-app
    image: my-app:latest
    volumeMounts:
    - mountPath: "/data"
      name: storage-volume
  volumes:
  - name: storage-volume
    persistentVolumeClaim:
      claimName: my-app-data
```

# Common Mistakes

- **AccessMode Mismatch:** Trying to mount a `ReadWriteOnce` volume to multiple Pods running on different nodes.
- **PV/PVC Namespace Confusion:** Forgetting that a PV is cluster-scoped, but a PVC is namespace-scoped. A Pod can only use a PVC from its own namespace.
- **Deleting the PVC unexpectedly:** Depending on the `reclaimPolicy` (usually `Delete` for dynamic volumes), deleting the PVC might permanently delete the underlying cloud disk and all your data.

# Follow-up Questions

- **What are the three Reclaim Policies?** (Answer: `Retain` (keep data, manual cleanup), `Delete` (delete disk immediately), and `Recycle` (obsolete, scrub files and make PV available again)).
- **What is Dynamic Provisioning?** (Answer: When a StorageClass automatically creates a PV in response to a PVC, so admins don't have to pre-create disks).
- **Can you expand a PVC?** (Answer: Yes, if the StorageClass has `allowVolumeExpansion: true`, you can increase the size of a PVC, though you usually can't decrease it).

# References

- [Kubernetes Documentation: Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
