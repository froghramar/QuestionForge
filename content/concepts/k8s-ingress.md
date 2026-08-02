---
id: concept.k8s-ingress
title: Kubernetes Ingress and Ingress Controllers
slug: k8s-ingress
topic: topic.orchestration
description: Managing external access to the services in a cluster, typically HTTP.
---
# Kubernetes Ingress

An **Ingress** is an API object that manages external access to the services in a cluster, typically HTTP. It can provide load balancing, SSL termination, and name-based virtual hosting.

## 1. The Ingress Resource
The Ingress resource is a set of rules that allow inbound connections to reach the cluster services.
- **Path-based routing:** `example.com/api` goes to service A, `example.com/shop` goes to service B.
- **Host-based routing:** `api.example.com` goes to service A, `shop.example.com` goes to service B.

## 2. The Ingress Controller
The Ingress resource does nothing by itself. You must have an **Ingress Controller** running in the cluster to fulfill the Ingress.
- Common controllers include **NGINX Ingress Controller**, **Traefik**, **HAProxy**, and cloud-specific ones like **AWS ALB Ingress Controller**.
- It is usually a reverse proxy deployed as a Deployment or DaemonSet.

## 3. Why use Ingress over LoadBalancer Services?
While a `LoadBalancer` service creates a new cloud load balancer for every service (which is expensive and hard to manage), an Ingress allows you to use a **single IP/Load Balancer** to route traffic to dozens of internal services based on the URL path or hostname.
