---
id: concept.python-mro
title: Python Method Resolution Order
slug: python-method-resolution-order
topic: topic.python-fundamentals
description: The C3 linearization Python uses to resolve attributes in inheritance hierarchies.
---
# Python Method Resolution Order

Python uses the method resolution order (MRO) to decide which class supplies an attribute. In multiple inheritance, its C3 linearization provides a predictable ordering and enables cooperative calls to `super()`.
