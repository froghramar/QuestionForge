---
id: concept.go-defer-panic-recover
title: Go Defer Panic and Recover
slug: go-defer-panic-and-recover
topic: topic.go-fundamentals
description: Deferred cleanup, panics, and controlled recovery in Go.
---
# Go Defer Panic and Recover

`defer` schedules a call for function exit, `panic` starts stack unwinding, and `recover` can stop a panic only when called directly from a deferred function in the same goroutine.
