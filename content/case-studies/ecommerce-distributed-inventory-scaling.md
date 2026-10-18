---
title: "Distributed Inventory & Flash Sale Scaling"
description: "How we engineered an atomic distributed inventory reservation engine that supported 10M+ Black Friday visitors with zero downtime and zero overselling."
industry: "E-Commerce & High-Volume Retail"
client: "Direct-to-Consumer Apparel Brand"
duration: "2 Months"
headline_metric: "10M+ Visits | 0 Overselling Incidents"
tech_stack:
  - "Node.js & TypeScript"
  - "Redis Cluster"
  - "Next.js"
  - "PostgreSQL"
  - "AWS CloudFront & Lambda@Edge"
testimonial:
  quote: "During our holiday drop last year, our store crashed three times and we oversold 1,200 jackets that we had to refund. This year with Gooby Tech's architecture, we had our biggest sales day in company history ($4.2M) without a single glitch."
  author: "David Chen"
  role: "Chief Technology Officer, ThreadCraft"
---

## Executive Summary

ThreadCraft is a high-growth streetwear and apparel brand known for limited-quantity viral product drops. In previous holiday sales, rapid traffic spikes caused severe database lock contention, shopping cart crashes, and catastrophic inventory overselling that severely damaged brand reputation.

Gooby Tech was brought in 8 weeks before Black Friday to re-architect their inventory reservation and checkout pipeline.

---

## The Technical Challenge

1. **Race Conditions & Overselling**: When 40,000 customers attempted to purchase 500 limited-edition units simultaneously, traditional SQL `SELECT FOR UPDATE` queries led to massive lock wait queues and database timeouts.
2. **Cart Abandonment & Phantom Holds**: Items locked in abandoned carts caused legitimate buyers to see "Out of Stock" messages when items were actually unpurchased.
3. **Frontend Edge Caching Invalidation**: Static pages cached on CDN edges were serving stale stock counts to frantic shoppers.

---

## Architectural Solution

### 1. In-Memory Atomic Reservations with Redis & Lua
We decoupled inventory reservation from relational database writes:
- Product stock is mirrored into a high-availability **Redis Cluster**.
- Reservation logic was implemented inside an atomic **Redis Lua script**. This executes in single-threaded sub-millisecond memory time, preventing all race conditions:
  - Verifies stock is available.
  - Decrements the counter atomically.
  - Generates a cryptographically signed 10-minute reservation token.
- If a user completes checkout within 10 minutes, the purchase is permanently committed to PostgreSQL asynchronously.
- If the token expires, Redis TTL keyspace notifications automatically return the quantity back into the available pool.

### 2. Edge Rate Limiting & Queueing
To protect backend payment processors, we implemented CloudFront and Lambda@Edge virtual waiting rooms during the first 60 seconds of flash sales, smoothing out spike curves into predictable request streams.

---

## Measurable Results

| Metric | Previous Black Friday | With Gooby Tech |
| :--- | :--- | :--- |
| **Peak Concurrency** | 12,000 users (System Crashed) | **68,000 concurrent users** |
| **Overselling Errors** | 1,200+ orders oversold | **0 oversold orders** |
| **Checkout API P99** | 6,800 ms (Timeouts) | **110 ms** |
| **Gross Revenue Processed** | Degraded / Refunded | **$4.2M record sales day** |
