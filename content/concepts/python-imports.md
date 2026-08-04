---
id: concept.python-imports
title: Python Imports and Modules
slug: python-imports-and-modules
topic: topic.python-fundamentals
description: Module execution, import caching, and import forms in Python.
---
# Python Imports and Modules

An import locates and executes a module the first time it is loaded, then caches the resulting module object in `sys.modules`. Later imports normally reuse that object rather than re-executing its top-level code.
