---
id: variant.load-balancing-basics.system-design
question: question.load-balancing-basics
technology: tech.system-design
---
# Expected Answer

A **Load Balancer** sits in front of your servers and routes incoming client requests to all servers capable of fulfilling those requests. Its primary goals are to prevent any single server from becoming a bottleneck and to ensure high availability.

If a server goes down, the load balancer redirects traffic to the remaining online servers. When a new server is added, the load balancer automatically starts sending requests to it.

For a simple web app, you might start with **Round Robin**. If your requests have varying processing times, **Least Connections** is better. If you need a user to stay on the same server for session data, you use **IP Hash** or **Sticky Sessions**.

# Why It Matters

Load balancing is the bridge between a single-server setup and a distributed system. It allows you to scale horizontally (adding more nodes) which is cheaper and more resilient than scaling vertically (buying a bigger server). Without it, your system has a single point of failure and a hard ceiling on performance.

# Example Architecture

1.  **Client** makes a request to `api.example.com`.
2.  **DNS** resolves to the IP of the **Load Balancer** (e.g., Nginx, HAProxy, AWS ALB).
3.  **Load Balancer** checks the health of the backend pool.
4.  **Load Balancer** picks a server based on the **Round Robin** algorithm.
5.  **Server A** processes the request and returns it to the Load Balancer.
6.  **Load Balancer** returns the response to the **Client**.

# Common Mistakes

- **Load Balancer as a Single Point of Failure:** Forgetting that the Load Balancer itself can fail. In production, you use a pair of Load Balancers in an "Active-Passive" setup with a Floating IP.
- **Ignoring Health Checks:** If the LB doesn't check if a server is actually working (e.g., via a `/health` endpoint), it will keep sending traffic to a crashed server (a "black hole").
- **State Management:** Assuming you can use local session storage on a server. Since a user's next request might go to a different server, you must use a centralized session store like Redis.

# Follow-up Questions

- **What is a "Sticky Session"?** (Answer: A mechanism where the load balancer routes all requests from a specific client to the same backend server for the duration of a session, often using a cookie).
- **Difference between L4 and L7 Load Balancing?** (Answer: L4 is fast and works at the transport layer (IP/Port). L7 works at the application layer, allowing routing based on HTTP content like headers or URL paths).
- **How does a Load Balancer handle SSL/TLS?** (Answer: Often via **SSL Termination**, where the LB decrypts the traffic before sending it to the backends, reducing the CPU load on the application servers).

# References

- [System Design Primer: Load Balancer](https://github.com/donnemartin/system-design-primer#load-balancer)
- [NGINX: What is Load Balancing?](https://www.nginx.com/resources/glossary/load-balancing/)
