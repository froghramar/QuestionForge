---
id: concept.angular-resource-api
title: Resource API (resource & rxResource)
slug: angular-resource-api
topic: topic.angular-advanced
description: Modern, signal-based asynchronous data fetching.
---
# Resource API
The Resource API provides a reactive, signal-based way to manage asynchronous data fetching and state. It replaces many common patterns involving manual `toSignal(http.get(...))` or complex RxJS streams for simple data loading.

Key Functions:
- **`resource()`**: The standard version for Promise-based or generic async fetching.
- **`rxResource()`**: The RxJS-integrated version, ideal for use with `HttpClient`.

Key Properties (Exposed as Signals):
- **`value`**: The current data returned by the resource.
- **`status`**: The current state (`Idle`, `Loading`, `Resolved`, `Error`, `Reloading`).
- **`isLoading`**: A boolean convenience signal.
- **`error`**: The error object if the fetch failed.

Key Features:
- **Request Signals**: Automatically re-fetches when a dependency signal (like a search query) changes.
- **Reloading**: A built-in `reload()` method to refresh data.
- **Local Optimistic Updates**: Methods to locally update the value before the server responds.
