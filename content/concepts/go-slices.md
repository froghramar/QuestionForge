---
id: concept.go-slices
title: Go Slices and Backing Arrays
slug: go-slices-and-backing-arrays
topic: topic.go-fundamentals
description: Slice headers, shared backing arrays, capacity, and append behavior.
---
# Go Slices and Backing Arrays

A slice is a small descriptor containing a pointer to an underlying array plus length and capacity. Copying a slice copies that descriptor, so slices can share storage until an append allocates a new backing array.
