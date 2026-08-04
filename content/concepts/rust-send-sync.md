---
id: concept.rust-send-sync
title: Rust Send and Sync
slug: rust-send-and-sync
topic: topic.rust-fundamentals
description: Marker traits that express safe cross-thread transfer and shared access.
---
# Rust Send and Sync

`Send` means ownership of a value can be transferred across threads. `Sync` means shared references to a type can be safely shared across threads. Rust uses these marker traits to prevent many concurrency errors at compile time.
