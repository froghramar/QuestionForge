---
id: concept.go-embedding
title: Go Struct Embedding
slug: go-struct-embedding
topic: topic.go-fundamentals
description: Composition, promoted fields and methods, and explicit delegation with embedded types.
---
# Go Struct Embedding

Embedding a type as an unnamed field promotes its accessible fields and methods to the outer type. It is composition rather than inheritance: the embedded value remains a distinct component and name conflicts require explicit selection.
