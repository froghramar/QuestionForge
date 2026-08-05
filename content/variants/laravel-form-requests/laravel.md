---
id: variant.laravel-form-requests.laravel
question: question.laravel-form-requests
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

A Form Request encapsulates input authorization and validation for one endpoint. Type-hint it in a controller, then use `validated()` to pass only approved fields onward. This keeps controllers thin, makes rules reusable and testable, and gives JSON clients Laravel’s structured validation response. Keep business conflicts, such as a duplicate domain rule, in the application layer rather than pretending they are field-shape validation.

# Why It Matters

Boundary validation prevents untrusted fields reaching persistence and gives clients predictable errors.

# Code Example

```php
final class StoreUserRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return ['email' => ['required', 'email']]; }
}
```

# Common Mistakes

- **Using `$request->all()` for writes:** Unexpected fields can be mass-assigned.
- **Putting authorization checks only in controllers:** Other entry points can bypass them.

# Follow-up Questions

- **What does `validated()` return?** (Answer: Only the data that passed the request rules.)
- **What status is used for JSON validation errors?** (Answer: 422.)
