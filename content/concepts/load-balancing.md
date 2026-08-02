---
id: concept.load-balancing
title: Load Balancing
slug: load-balancing
topic: topic.distributed-systems
description: Distributing network or application traffic across multiple servers.
---
# Load Balancing

Load balancing refers to the process of distributing incoming network traffic across a group of backend servers, also known as a server farm or server pool.

## Key Functions
- **Distributes client requests** or network load efficiently across multiple servers.
- **Ensures high availability** and reliability by sending requests only to servers that are online.
- **Provides the flexibility** to add or subtract servers as demand dictates.

## Common Algorithms
1.  **Round Robin:** Successive requests are delegated to the next server in the list.
2.  **Least Connections:** Sends requests to the server with the fewest active connections.
3.  **IP Hash:** The client's IP address is used to determine which server receives the request (good for session persistence).
4.  **Weighted Round Robin/Least Connections:** Servers are assigned weights based on their capacity.

## L4 vs. L7 Load Balancing
- **Layer 4 (Transport):** Based on data from network and transport layer protocols (IP address and TCP port). It is fast but doesn't "look" at the content of the request.
- **Layer 7 (Application):** Based on the content of the request (URL, headers, cookies). It allows for more complex routing (e.g., sending `/api` requests to one pool and `/static` to another).
