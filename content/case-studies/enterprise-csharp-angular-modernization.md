---
title: "Enterprise Supply Chain Modernization in C# & Angular"
description: "How we migrated a legacy enterprise logistics platform to modern C# ASP.NET Core and Angular, cutting memory usage by 65% and boosting API throughput 5x."
industry: "C# (.NET Core) & Angular / TypeScript"
client: "Global Logistics & Freight Enterprise"
duration: "5 Months"
headline_metric: "5x API Throughput | -65% Memory"
tech_stack:
  - "C# (.NET 8)"
  - "ASP.NET Core Web API"
  - "Angular 17"
  - "TypeScript"
  - "Entity Framework Core"
  - "Microsoft Azure"
testimonial:
  quote: "The migration from legacy .NET Framework to .NET 8 and Angular gave our dispatchers real-time visibility for the first time in years. Gooby Technologies, LLC delivered clean architecture, rock-solid C# code, and an incredibly responsive Angular interface."
  author: "David Vance"
  role: "Chief Technology Officer, TransGlobal Logistics"
---

## Executive Summary

TransGlobal Logistics operates a nationwide fleet of 4,000 freight carriers and manages real-time warehouse distribution for multinational retail partners. Their mission-critical fleet management application was running on an aging .NET Framework monolith with an outdated frontend, leading to high hosting costs on dedicated Windows servers, sluggish dispatch tracking, and difficult developer onboarding.

Gooby Technologies, LLC was engaged to execute an incremental modernization of their core services to **C# (.NET 8)** and build an enterprise-grade **Angular** SPA.

---

## The Technical Challenge

1. **High Memory Overhead & Cold Starts**: The legacy .NET monolith consumed excessive RAM per worker process, restricting containerization and auto-scaling on Microsoft Azure.
2. **Unoptimized Database Queries**: Complex Entity Framework queries generated inefficient SQL with multiple round-trips to SQL Server, causing database timeouts during morning carrier dispatch waves.
3. **Monolithic Frontend Architecture**: The legacy server-rendered views lacked client-side interactivity, forcing dispatchers to reload full pages to check updated shipment statuses and driver GPS pins.

---

## Architectural Solution

### 1. Modern ASP.NET Core (.NET 8) Web API
We rebuilt the logistics backend following **Clean Architecture** and Domain-Driven Design (DDD):
- **Minimal APIs & Controllers**: Migrated business logic into lightweight, high-performance ASP.NET Core endpoints running in lightweight Linux containers on Azure Container Apps.
- **Entity Framework Core 8 Optimization**: Profiled and tuned database operations using compiled queries, `AsNoTracking()` for read paths, and indexed spatial geometry queries for real-time truck geofencing.
- **Real-Time SignalR Hubs**: Implemented ASP.NET Core SignalR to push instant carrier location updates and status changes to connected dispatchers without HTTP polling.

### 2. Enterprise Angular 17 SPA with RxJS & NgRx
We engineered a modern, modular frontend in **Angular 17** using strict **TypeScript**:
- **Signals & Reactive Streams**: Utilized Angular Signals and RxJS operators to handle high-frequency SignalR message streams smoothly without UI jank.
- **NgRx Store for Fleet State**: Maintained deterministic client-side state for active shipments, driver routes, and warehouse bays.
- **Lazy-Loaded Standalone Components**: Reduced initial bundle size by 72% through standalone Angular components and route-level code splitting.

---

## Measurable Results

| Metric | Legacy .NET System | Modern C# & Angular | Impact |
| :--- | :--- | :--- | :--- |
| **P99 API Response Time** | 1,450 ms | **120 ms** | **91% Latency Improvement** |
| **Max Throughput** | 600 req/sec | **3,200+ req/sec** | **5x Throughput Capacity** |
| **Server Memory Footprint** | 8.2 GB per instance | **2.8 GB per instance** | **65% RAM Reduction** |
| **Azure Hosting Costs** | $22,400 / mo | **$8,100 / mo** | **63% Monthly Cloud Savings** |

---

## Client Outcome

The modernization enabled TransGlobal to onboard 1,200 new freight partners without adding backend infrastructure. The new Angular dispatch portal improved dispatcher efficiency by 35% and drastically reduced driver wait times at distribution centers.
