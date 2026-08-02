---
id: variant.custom-middleware.dotnet
question: question.custom-middleware
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

In ASP.NET Core, middleware is a class that resides in the request pipeline. To write a custom one, you typically need a class with a constructor that takes `RequestDelegate` and an `InvokeAsync` method.

**Real-time use case**: A "Request Timing" middleware that logs how long each API request takes to process.

# Why It Matters

Middleware allows you to separate cross-cutting concerns from your business logic. Instead of putting logging or auth logic in every controller action, you put it in a single middleware that wraps the entire request.

# Code Example

```csharp
public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;

    public RequestTimingMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        var watch = Stopwatch.StartNew();
        
        // Pass to the next middleware in the pipe
        await _next(context);
        
        watch.Stop();
        Console.WriteLine($"Request {context.Request.Path} took {watch.ElapsedMilliseconds}ms");
    }
}

// Registration in Program.cs
// app.UseMiddleware<RequestTimingMiddleware>();
```

# Common Mistakes

- **Incorrect Order**: Placing error-handling middleware *after* the middleware that might throw an exception.
- **Forgetting `await _next(context)`**: This will short-circuit the pipeline, and no further middleware (or your controllers) will be executed.

# Follow-up Questions

- **Singleton vs Scoped Middleware?** (Answer: Middleware is usually a Singleton. If you need Scoped services, you must inject them into the `InvokeAsync` method, not the constructor).
- **What is the difference between `app.Use` and `app.Run`?** (Answer: `app.Use` passes to the next middleware; `app.Run` is a terminal middleware that ends the pipeline).
