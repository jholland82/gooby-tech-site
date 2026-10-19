---
title: "Optimizing Ruby on Rails and Sidekiq for High-Throughput Production"
description: "A battle-tested guide to scaling Ruby on Rails applications: ActiveRecord query tuning, connection pool sizing, jemalloc memory optimization, and Sidekiq worker concurrency."
date: 2026-10-01T10:00:00Z
author: "Gooby Tech Engineering Team"
tags:
  - "ruby-on-rails"
  - "sidekiq"
  - "postgresql"
  - "performance"
---

Ruby on Rails is celebrated for its incredible developer velocity, but as transactional volume surges into millions of requests and background jobs per day, default settings can lead to database connection exhaustion, memory fragmentation, and bloated worker processes.

In this guide, we share the core architectural optimizations we implement at **Gooby Tech** to scale Rails and Sidekiq to high-volume production workloads.

---

## 1. Eliminate Memory Bloat with jemalloc

By default, the standard glibc memory allocator handles memory fragmentation poorly when Ruby creates and destroys millions of small string and hash objects. This results in Rails Puma and Sidekiq processes slowly bloating until they hit Linux OOM (Out Of Memory) limits.

The remedy is compiling Ruby with or preloading `jemalloc`:

```dockerfile
# Dockerfile snippet for Rails production image
RUN apt-get update && apt-get install -y --no-install-recommends libjemalloc2
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2
```

In production benchmarking, switching to **jemalloc** typically yields an immediate **25% to 40% reduction in total memory consumption** and eliminates process memory creep.

---

## 2. Enforcing Strict Loading in ActiveRecord

N+1 database queries are the single most common cause of slow Rails endpoints. Rails 6.1+ introduced `strict_loading`, which turns silent query degradation into explicit errors during testing:

```ruby
# In app/models/account.rb
class Account < ApplicationRecord
  has_many :transactions, strict_loading: true
end

# In your controller or service
# This raises ActiveRecord::StrictLoadingViolationError if not preloaded
accounts = Account.strict_loading.includes(:transactions).where(active: true)
```

By enforcing `config.active_record.action_on_strict_loading_violation = :raise` in test and development environments, your engineering team will never accidentally introduce an N+1 query to production.

---

## 3. Sidekiq Concurrency & Database Pool Math

A common production outage occurs when Sidekiq worker concurrency exceeds the PostgreSQL connection pool limit.

Each Sidekiq thread that queries the database requires its own connection from the ActiveRecord pool. If Sidekiq concurrency is set to 25, but your `database.yml` pool is set to 10, threads will block waiting for a connection until timing out:

```yaml
# config/database.yml
production:
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 10 } %>
```

Always ensure:
$$\text{DB Pool Size} \ge \text{Sidekiq Concurrency} + 2$$

The extra two connections provide headroom for internal Rails health checks and background telemetry.

---

## 4. Bulk Inserts with `insert_all`

Instead of creating records in iterative loops inside workers:

```ruby
# Slow: N separate SQL INSERT queries and callbacks
records.each { |r| Payment.create!(r) }

# Fast: Single SQL multi-row INSERT query (bypasses callbacks & validations)
Payment.insert_all(records, returning: %w[id uuid])
```

Using `insert_all` reduces database write time from hundreds of individual network round-trips to a single statement, slashing batch ingestion time by over **85%**.
