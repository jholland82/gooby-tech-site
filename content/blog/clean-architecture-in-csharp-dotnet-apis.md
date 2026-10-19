---
title: "Clean Architecture in C# and ASP.NET Core: A Practical Guide"
description: "How to structure modern enterprise C# (.NET 8/9) applications using Clean Architecture, Domain-Driven Design, and Entity Framework Core without unnecessary boilerplate."
date: 2026-10-06T12:00:00Z
author: "Gooby Tech Engineering Team"
tags:
  - "csharp"
  - "dotnet"
  - "architecture"
  - "aspnetcore"
---

Modern **C# (.NET 8 and 9)** is one of the fastest and most productive enterprise software platforms in the world. However, as backend codebases expand, controllers frequently become bloated with business logic, database queries, and third-party API dependencies.

In this article, we outline how to implement a pragmatic **Clean Architecture** in C# that decouples core business rules from infrastructure concerns.

---

## The Four Core Layers

```
┌──────────────────────────────────────────────┐
│  Presentation (ASP.NET Core Web APIs)        │
│  ┌────────────────────────────────────────┐  │
│  │  Application (Commands, Queries, DTOs) │  │
│  │  ┌──────────────────────────────────┐  │  │
│  │  │  Domain (Entities, Value Objects)│  │  │
│  │  └──────────────────────────────────┘  │  │
│  │  Infrastructure (EF Core, SQL, Mail)   │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

1. **Domain**: The core business models, domain events, and business rules. Has zero dependencies on any external framework or database library.
2. **Application**: Use cases, command and query handlers, and interface contracts (e.g., `IRepository`, `IPaymentGateway`).
3. **Infrastructure**: Concrete implementations of database persistence (Entity Framework Core), external APIs, and file storage.
4. **Presentation**: ASP.NET Core Minimal APIs or Controllers that map incoming HTTP requests to application commands.

---

## Entity Framework Core: Projection Over Full Tracking

When querying data solely to return an API response, tracking entity state in EF Core's Change Tracker is pure waste. Always use `.AsNoTracking()` and project directly into DTOs using `.Select()`:

```csharp
// In Application/Orders/Queries/GetOrderSummaryQuery.cs
public async Task<OrderSummaryDto?> Handle(
    Guid orderId, 
    ApplicationDbContext dbContext, 
    CancellationToken ct)
{
    return await dbContext.Orders
        .AsNoTracking()
        .Where(o => o.Id == orderId)
        .Select(o => new OrderSummaryDto(
            o.Id,
            o.OrderNumber,
            o.Customer.Email,
            o.TotalAmount,
            o.CreatedAt))
        .FirstOrDefaultAsync(ct);
}
```

By projecting directly into a record type, EF Core generates a tight `SELECT o.Id, o.OrderNumber...` query instead of pulling all columns, saving bandwidth, memory, and database I/O.

---

## Pragmatic Dependency Injection

Keep registrations organized by project layers using extension methods on `IServiceCollection`:

```csharp
// Infrastructure/DependencyInjection.cs
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services, 
        IConfiguration config)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(config.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        services.AddScoped<IPaymentGateway, StripePaymentGateway>();
        return services;
    }
}
```

This ensures your `Program.cs` stays clean and declarative:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration);

var app = builder.Build();
app.MapOrderEndpoints();
app.Run();
```

---

## Summary

Clean Architecture in C# prevents technological lock-in, makes unit testing straightforward through mockable interfaces, and enables multiple teams to work concurrently on domain logic without stepping on database migrations.
