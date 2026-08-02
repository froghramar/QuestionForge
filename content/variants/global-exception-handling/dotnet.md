---
id: variant.global-exception-handling.dotnet
question: question.global-exception-handling
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

In modern ASP.NET Core, global exception handling is implemented using the `IExceptionHandler` interface (introduced in .NET 8) or custom middleware.

**Real-time Example**: When any service throws an `UnauthorizedException`, the global handler catches it, logs the event, and returns a `401 Unauthorized` JSON response with a friendly message.

# Why It Matters

It prevents the application from crashing and ensures the client always receives a structured response (like `ProblemDetails`) instead of an ugly HTML error page or a raw stack trace, which is a security risk.

# Code Example

```csharp
public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var response = new { Message = "An unexpected error occurred." };
        httpContext.Response.StatusCode = 500;
        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
        
        return true; // Exception handled
    }
}

// Registration in Program.cs
// builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
// app.UseExceptionHandler(_ => { });
```

# Common Mistakes

- **Leaking sensitive info**: Returning `exception.Message` or `exception.StackTrace` in production.
- **Not logging**: Catching the exception but failing to log it for developers to see.

# Follow-up Questions

- **What is `ProblemDetails`?** (Answer: A standardized JSON format for returning machine-readable error details in HTTP responses).
- **Middleware vs Exception Filters?** (Answer: Middleware handles everything in the pipe; Filters only handle exceptions within the MVC/Controller context).
