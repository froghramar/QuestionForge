---
id: concept.docker-networking
title: Docker Networking
slug: docker-networking
topic: topic.containerization
description: How Docker containers communicate with each other and the outside world.
---
# Docker Networking

Docker’s networking subsystem is pluggable, using drivers. Several drivers exist by default and provide core networking functionality.

## Core Network Drivers

1.  **bridge (Default):** The default network driver. If you don’t specify a driver, this is the type of network you are creating. Bridge networks are usually used when your applications run in standalone containers that need to communicate.
2.  **host:** Removes network isolation between the container and the Docker host, and uses the host’s networking directly. The container does not get its own IP-address allocated. For instance, if you run a container that binds to port 80 and you use host networking, the container’s application is available on port 80 on the host’s IP address.
3.  **none:** For this container, disable all networking. Usually used in conjunction with a custom network driver.
4.  **overlay:** Connects multiple Docker daemons together and enables swarm services to communicate with each other. This is for multi-host networking.
5.  **ipvlan / macvlan:** Give you direct control over IPv4 and IPv6 addressing, allowing you to assign a MAC address to a container, making it appear as a physical device on your network.

## Key Networking Concepts

- **DNS Resolution:** Docker has a built-in DNS server that allows containers on the same user-defined network to resolve each other by name.
- **Port Mapping:** `-p 8080:80` maps port 8080 on the host to port 80 in the container.
