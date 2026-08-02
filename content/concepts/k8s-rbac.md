---
id: concept.k8s-rbac
title: Role-Based Access Control (RBAC)
slug: k8s-rbac
topic: topic.orchestration
description: Regulating access to computer or network resources based on the roles of individual users within a cluster.
---
# Kubernetes RBAC

RBAC is the mechanism used to control who can do what within a Kubernetes cluster. It uses the `rbac.authorization.k8s.io` API group to drive authorization decisions.

## 1. The Four Core Objects
- **Role:** Defines a set of permissions within a specific **Namespace**. (e.g., "can read pods in 'default'").
- **ClusterRole:** Defines a set of permissions across the **entire cluster** or for non-namespaced resources (like Nodes).
- **RoleBinding:** Grants the permissions defined in a Role to a user or set of users within a specific **Namespace**.
- **ClusterRoleBinding:** Grants permissions defined in a ClusterRole to a user or set of users across the **entire cluster**.

## 2. Subjects
Subjects are the entities that are granted permissions:
- **Users:** Managed externally (e.g., via Google Accounts or certificates). Kubernetes does not have a "User" object.
- **Groups:** Sets of users.
- **ServiceAccounts:** Identities for processes running in Pods. This is how your code talks to the Kubernetes API.

## 3. Verbs and Resources
Permissions are defined as a combination of:
- **Verbs:** `get`, `list`, `watch`, `create`, `update`, `patch`, `delete`.
- **Resources:** `pods`, `services`, `deployments`, `secrets`, etc.

## 4. Best Practice: Least Privilege
Always start with no permissions and add only what is strictly necessary. Use Namespaced Roles instead of ClusterRoles whenever possible to limit the "blast radius" of a compromised identity.
