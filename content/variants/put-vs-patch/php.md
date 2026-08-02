---
id: variant.put-vs-patch.php
question: question.put-vs-patch
technology: tech.php
---
# Expected Answer (PHP 8.5 / Laravel)

In PHP APIs (like Laravel):

1. **PUT**: Used to replace the entire resource.
2. **PATCH**: Used for partial updates.

**Real-time Example**:
- **PUT**: Updating a User's full profile.
- **PATCH**: Updating just the user's `email_verified_at` field.

# Why It Matters

Using the correct method impacts how you validate requests. For a `PUT`, all required fields must be present. For a `PATCH`, you typically make all fields optional in your validation logic because the client might only send one or two.

# Code Example

```php
// Laravel Controller
public function update(Request $request, User $user)
{
    if ($request->isMethod('put')) {
        // Validate ALL fields
        $data = $request->validate([...]);
    } else {
        // Validate only PROVIDED fields
        $data = $request->validate([...]);
    }
    
    $user->update($data);
}
```

# Common Mistakes

-   **HTML Form Limitation**: Browsers don't support `PUT` or `PATCH` directly in HTML forms. PHP frameworks use **Method Spoofing** (`<input type="hidden" name="_method" value="PUT">`) to handle this.
-   **Ignoring Idempotency**: Implementing `PUT` in a way that creates a new resource if it doesn't exist (this is allowed but often confusing; usually `POST` is for creation).

# Follow-up Questions

-   **What is Method Spoofing?** (Answer: A technique where a POST request includes a special field to tell the server to treat it as a PUT or DELETE).
-   **Is PATCH idempotent?** (Answer: Not necessarily, though it can be).
---
