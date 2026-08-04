---
id: concept.go-maps
title: Go Maps
slug: go-maps
topic: topic.go-fundamentals
description: Hash maps, zero-value lookup, presence checks, and concurrent access rules.
---
# Go Maps

Go maps associate comparable keys with values. A lookup of an absent key returns the value type's zero value, so the comma-ok form distinguishes absence from an explicitly stored zero value. Ordinary maps are not safe for concurrent reads and writes.
