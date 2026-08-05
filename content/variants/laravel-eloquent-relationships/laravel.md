---
id: variant.laravel-eloquent-relationships.laravel
question: question.laravel-eloquent-relationships
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Eloquent relationship methods express associations, but accessing an unloaded relation in a loop can create an N+1 pattern: one query for the collection plus one per model. Use eager loading with `with()` when a response needs related records, select only needed fields, and still enforce foreign keys and indexes in the database.

# Why It Matters

N+1 queries can make a seemingly small endpoint overwhelm the database as result size grows.

# Code Example

```php
$orders = Order::query()
    ->with('customer:id,name')
    ->latest()
    ->limit(50)
    ->get();
```

# Common Mistakes

- **Lazy-loading relations in a serialization loop:** Query count grows with every model.
- **Relying on models instead of database constraints:** Data integrity can be bypassed.

# Follow-up Questions

- **What does `with()` prevent?** (Answer: Common N+1 query patterns.)
- **When is lazy loading acceptable?** (Answer: When the relation is truly optional and access is rare.)
