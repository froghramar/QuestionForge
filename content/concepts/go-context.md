---
id: concept.go-context
title: Go Context Cancellation
slug: go-context-cancellation
topic: topic.go-fundamentals
description: Request-scoped deadlines, cancellation signals, and values with context.Context.
---
# Go Context Cancellation

`context.Context` carries cancellation signals, deadlines, and request-scoped values across API boundaries. Derived contexts must have their cancellation functions called when no longer needed.
