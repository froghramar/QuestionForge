---
id: concept.go-errors
title: Go Error Handling
slug: go-error-handling
topic: topic.go-fundamentals
description: Explicit errors, contextual wrapping, and error inspection in Go.
---
# Go Error Handling

Go represents expected failures as explicit `error` return values. Callers check errors close to the operation, wrap them with context using `%w`, and inspect chains with `errors.Is` or `errors.As`.
