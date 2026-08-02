---
id: variant.k8s-probes.kubernetes
question: question.k8s-probes
technology: tech.kubernetes
---
# Expected Answer

Kubernetes uses three types of probes to manage container health:

1.  **Liveness Probe:** Tells Kubernetes if the app is still alive. If it fails, Kubernetes **restarts** the container. Use this to recover from deadlocks or infinite loops.
2.  **Readiness Probe:** Tells Kubernetes if the app is ready to handle requests. If it fails, Kubernetes **stops sending traffic** to the Pod (removes it from Services). Use this during startup or if the app is temporarily overloaded.
3.  **Startup Probe:** Used for apps that take a long time to start. It disables the other two probes until the app is up, preventing the liveness probe from killing the app while it's still booting.

# Why It Matters

Without these probes, Kubernetes only knows if the process is running. If your app is stuck in a deadlock but the process hasn't crashed, Kubernetes will think it's fine and keep sending it traffic. Conversely, without readiness probes, Kubernetes will send traffic to your app as soon as it starts, even if it's still busy connecting to the database, causing users to see errors.

# Example Code

### A Robust Probe Configuration
```yaml
spec:
  containers:
  - name: my-app
    image: my-app:latest
    # Wait for the app to finish booting
    startupProbe:
      httpGet:
        path: /health/startup
        port: 8080
      failureThreshold: 30
      periodSeconds: 10
    # Check if we should restart the container
    livenessProbe:
      httpGet:
        path: /health/live
        port: 8080
    # Check if we should send traffic to the Pod
    readinessProbe:
      httpGet:
        path: /health/ready
        port: 8080
```

# Common Mistakes

- **Same endpoint for Liveness and Readiness:** If your `/health` endpoint checks the DB connection and the DB goes down, a Liveness probe will cause all your containers to restart in a loop (bad), whereas a Readiness probe would just stop traffic (good).
- **Too frequent/expensive probes:** Running a heavy DB query every 2 seconds for a probe can slow down both your app and your database.
- **Forgetting `initialDelaySeconds`:** (Before Startup Probes were common) Restarting the container because the liveness probe timed out during a slow boot.

# Follow-up Questions

- **What is the difference between an HTTP probe and a TCP probe?** (Answer: HTTP checks for a 2xx/3xx response, TCP just checks if a connection can be opened. Use HTTP if your app has an API).
- **What is a "Cascading Failure" in the context of readiness probes?** (Answer: If a service is overloaded and its readiness probe fails, traffic moves to other Pods, overloading *them* and causing *their* probes to fail, eventually taking down the whole service).
- **How many times does a probe have to fail before taking action?** (Answer: Defined by `failureThreshold`, which defaults to 3).

# References

- [Kubernetes Documentation: Configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
