---
id: concept.python-gil
title: Python Global Interpreter Lock
slug: python-global-interpreter-lock
topic: topic.python-fundamentals
description: The CPython lock that limits simultaneous execution of Python bytecode.
---
# Python Global Interpreter Lock

In CPython, the Global Interpreter Lock (GIL) allows only one thread at a time to execute Python bytecode in a process. It simplifies memory management but affects how CPU-bound threaded programs scale.
