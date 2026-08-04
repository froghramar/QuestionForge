---
id: concept.python-equality-hashing
title: Python Equality and Hashing
slug: python-equality-and-hashing
topic: topic.python-fundamentals
description: Value equality, object identity, and hash-based collection contracts.
---
# Python Equality and Hashing

Python distinguishes identity (`is`) from value equality (`==`). Objects used as dictionary keys or set members must have a stable hash consistent with equality for as long as they are stored in those collections.
