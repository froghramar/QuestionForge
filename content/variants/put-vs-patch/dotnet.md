---
id: variant.put-vs-patch.dotnet
question: question.put-vs-patch
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

In ASP.NET Core APIs:

1. **PUT**: Replaces the entire resource. The request body must contain all required fields of the object.
2. **PATCH**: Updates only specific fields. In .NET, this is often implemented using `JsonPatchDocument` (JSON Patch standard).

**Real-time Example**:
- **PUT**: Updating a User's full profile (Name, Email, Bio).
- **PATCH**: Updating just the User's `Status` from "Active" to "Away".

# Why It Matters

Using PATCH reduces bandwidth because you don't send the entire object. It also prevents "Last-Write-Wins" conflicts where two users update different fields at the same time and accidentally overwrite each other's changes.

# Code Example

```csharp
// PUT: Full Replace
[HttpPut("{id}")]
public IActionResult UpdateUser(int id, UserUpdateDto userDto)
{
    var user = _repository.Get(id);
    user.Name = userDto.Name; // Full sync
    _repository.Save();
    return NoContent();
}

// PATCH: Partial Update (using Microsoft.AspNetCore.JsonPatch)
[HttpPatch("{id}")]
public IActionResult PatchUser(int id, [FromBody] JsonPatchDocument<User> patchDoc)
{
    var user = _repository.Get(id);
    patchDoc.ApplyTo(user); // Only applies specific ops like "replace"
    _repository.Save();
    return NoContent();
}
```

# Common Mistakes

- **Using PUT for partial updates**: This often leads to nullifying fields that the client didn't intend to change.
- **Complexity of PATCH**: Implementing full JSON Patch (RFC 6902) is more complex than a simple PUT. Many developers use a "Partial DTO" approach instead.

# Follow-up Questions

- **What is an ETag?** (Answer: A version identifier used with `If-Match` headers to prevent concurrent update conflicts).
- **Is PUT idempotent?** (Answer: Yes, by definition).
