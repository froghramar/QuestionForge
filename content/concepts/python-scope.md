---
id: concept.python-scope
title: Python Scope Rules
slug: python-scope-rules
topic: topic.python-fundamentals
description: Local, enclosing, global, and built-in name resolution in Python.
---
# Python Scope Rules

Python resolves unqualified names using LEGB order: local, enclosing, global, then built-in scope. Assignments create local bindings unless `global` or `nonlocal` explicitly selects an outer binding.
