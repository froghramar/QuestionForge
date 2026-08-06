---
id: variant.grpc-service-communication.system-design
question: question.grpc-service-communication
technology: tech.system-design
---
# Expected Answer

gRPC is a contract-first RPC framework commonly used for internal service communication. A `.proto` definition specifies message fields and service methods, then generated clients and servers provide strongly typed interfaces in several languages. It uses Protocol Buffers for compact binary messages and HTTP/2 for multiplexing and streaming. Choose unary RPCs for request-response calls; use streaming only when a continuous flow reduces polling or allows incremental results and both sides can handle backpressure.

Treat an RPC as a remote operation, not a local method call. Every call needs a deadline, and servers must stop work when the context is cancelled. Propagate a bounded remaining deadline to downstream calls; do not reset it at each hop. Retry only transient failures and only idempotent operations, with exponential backoff and jitter. Return canonical status codes plus safe details, and propagate tracing metadata. For compatible evolution, never reuse field numbers, do not change a field's wire type or meaning, and add optional fields instead. Consider browser support: native browsers do not expose the full gRPC HTTP/2 model, so a gateway or gRPC-Web is often required.

# Why It Matters

Without timeouts and compatibility discipline, internal calls can form cascading failure chains or break services during a routine deployment. gRPC improves interface safety, but it does not remove distributed-systems failure modes.

# Example Code

```proto
syntax = "proto3";
package inventory.v1;

service InventoryService {
  rpc Reserve(ReserveRequest) returns (ReserveResponse);
}

message ReserveRequest { string order_id = 1; string sku = 2; int32 quantity = 3; }
message ReserveResponse { string reservation_id = 1; }
```

```typescript
const response = await client.reserve(
  { orderId, sku, quantity },
  { deadline: new Date(Date.now() + 500) },
);
```

# Common Mistakes

- **Calling an RPC without a deadline:** A stalled downstream call can consume connections and thread capacity until it triggers a broader outage.
- **Retrying every error:** Retrying validation failures wastes work, while retrying non-idempotent mutations can duplicate side effects.
- **Reusing a deleted field number:** Older serialized messages can be misinterpreted by new servers, corrupting meaning silently.

# Follow-up Questions

- **How do gRPC deadlines differ from timeouts?** (Answer: A deadline is an absolute end time that can be propagated across hops; a timeout is a local duration.)
- **When is streaming a poor choice?** (Answer: For short independent operations where stream lifecycle, flow control, and recovery cost more than unary calls.)

# Related Questions

- [Microservice Boundaries](/questions/microservice-boundaries)
- [Load Balancing Basics](/questions/load-balancing-basics)

# References

- [gRPC: Core Concepts](https://grpc.io/docs/what-is-grpc/core-concepts/)
- [Protocol Buffers: Updating a Message Type](https://protobuf.dev/programming-guides/proto3/#updating)
