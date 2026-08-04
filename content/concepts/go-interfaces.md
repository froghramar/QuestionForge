---
id: concept.go-interfaces
title: Go Interfaces and Nil
slug: go-interfaces-and-nil
topic: topic.go-fundamentals
description: Implicit interface implementation and the distinction between nil interfaces and nil concrete values.
---
# Go Interfaces and Nil

Go types implement interfaces implicitly by providing the required method set. An interface value contains a dynamic type and dynamic value, so an interface holding a typed nil pointer is not itself nil.
