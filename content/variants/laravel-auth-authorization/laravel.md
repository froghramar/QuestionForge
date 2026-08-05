---
id: variant.laravel-auth-authorization.laravel
question: question.laravel-auth-authorization
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Guards establish the authenticated user for a request; policies and gates decide whether that user may act on a particular resource. Put object-level rules in policies so ownership and tenant constraints remain consistent across controllers, jobs, and other entry points. Authentication alone never proves a user may modify every resource.

# Why It Matters

Policies prevent broken access control that simple role checks often miss.

# Code Example

```php
final class OrderPolicy
{
    public function update(User $user, Order $order): bool
    {
        return $order->customer_id === $user->id;
    }
}
```

# Common Mistakes

- **Checking only a broad role:** A role may not grant ownership of every object.
- **Trusting a user ID from the request body:** Identity must come from authentication.

# Follow-up Questions

- **What is a guard?** (Answer: An authentication mechanism.)
- **What is a policy?** (Answer: A model or resource authorization rule.)
