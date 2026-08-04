---
id: concept.go-method-receivers
title: Go Method Receivers
slug: go-method-receivers
topic: topic.go-fundamentals
description: Value and pointer receiver behavior, method sets, mutation, and copying.
---
# Go Method Receivers

Value receiver methods receive a copy of the value, while pointer receiver methods receive a pointer and can mutate the original. Receiver choice also affects interface satisfaction and whether calling a method copies synchronization primitives or large structs.
