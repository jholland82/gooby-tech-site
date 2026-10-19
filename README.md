# Gooby Tech — Software Engineering Services Website

A production-grade, ultra-fast Hugo website engineered for software engineering consultancies and senior developers specializing in **Ruby on Rails**, **TypeScript / JavaScript (React & Angular)**, **C# (.NET)**, and **Swift (iOS)**.

Built with **zero external npm runtime dependencies**, leveraging **Hugo Pipes** for asset fingerprinting, minification, and sub-30ms static builds.

---

## ⚡ Key Highlights & Features

- **Blazing Fast**: Compiles in **< 30 milliseconds** with Hugo extended.
- **Deep Tech Visual Aesthetic**: Sleek developer-first dark mode by default with persistent dark/light theme switching.
- **Specialized Technologies**:
  - **Ruby on Rails**: Rails 7 & 8, Hotwire / Turbo, Sidekiq background queues, PostgreSQL tuning.
  - **TypeScript & JavaScript**: Enterprise React, Next.js, and Angular single-page applications.
  - **C# & .NET**: High-throughput ASP.NET Core (.NET 8/9), Clean Architecture, Entity Framework Core, Azure.
  - **Swift**: Fluid native iOS & iPadOS applications, SwiftUI, Combine, SwiftData offline-first sync.
- **Comprehensive Structure**:
  - **Homepage**: Value proposition hero, live availability status, key metrics strip, core service previews, interactive tech stack matrix with category tabs, client testimonials, and engineering workflow.
  - **Services Section (`/services/`)**: Detailed deep dives for 6 core software engineering services (deliverables checklist, outcomes, tech stack badges, and FAQs).
  - **Case Studies (`/case-studies/`)**: Real-world architectural breakdowns detailing client challenges, technical architectures, stack choices, quantitative ROI metrics, and client endorsements.
  - **Engineering Insights / Blog (`/blog/`)**: Technical articles with estimated reading time, author metadata, tags, and syntax-highlighted code blocks with 1-click **Copy** buttons.
  - **About (`/about/`)**: Engineering philosophy, principles, and comparison matrix.
  - **Contact & Hiring (`/contact/`)**: Conversion-optimized technical inquiry form with budget tiers, direct Calendly scheduling, email/phone details, and confidentiality/IP ownership badges.
  - **404 Page (`/404.html`)**: Developer-themed terminal error screen.
- **SEO & Social Proof Ready**: Pre-configured OpenGraph tags, Twitter Cards, Schema.org `ProfessionalService` JSON-LD structured data, RSS feed, and XML sitemaps.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure Hugo (extended version) is installed:
```bash
hugo version
```

### 2. Start the Local Development Server
Run the local Hugo development server with live reload and draft rendering:
```bash
hugo server -D
```
Then navigate to `http://localhost:1313/` in your browser.

### 3. Production Build
Compile minified static HTML, CSS, and JS into the `public/` directory:
```bash
hugo --minify
```

---

## 📁 Project Architecture

```
gooby-tech-site/
├── assets/
│   ├── css/
│   │   └── main.css           # Modern design system (CSS variables, glassmorphism, responsive grid)
│   ├── js/
│   │   └── main.js            # Theme switcher, mobile nav, tech tabs, copy-code button
│   └── images/
│       └── logo.svg           # Monogram & typography vector brand asset
├── content/
│   ├── _index.md              # Homepage metadata
│   ├── about.md               # About page & engineering standards
│   ├── contact.md             # Contact page layout
│   ├── services/              # Individual service pages
│   │   ├── ruby-on-rails-engineering.md
│   │   ├── modern-frontend-react-angular.md
│   │   ├── csharp-dotnet-enterprise.md
│   │   ├── swift-ios-mobile.md
│   │   ├── full-stack-web-apps.md
│   │   └── security-performance-audits.md
│   ├── case-studies/          # Quantified technical case studies
│   │   ├── fintech-rails-react-clearing-engine.md
│   │   ├── enterprise-csharp-angular-modernization.md
│   │   ├── swift-ios-offline-first-healthcare.md
│   │   └── ecommerce-rails-angular-inventory.md
│   └── blog/                  # Technical thought-leadership articles
│       ├── optimizing-ruby-on-rails-and-sidekiq-at-scale.md
│       ├── clean-architecture-in-csharp-dotnet-apis.md
│       ├── building-resilient-offline-apps-in-swift.md
│       └── angular-vs-react-enterprise-architecture-guide.md
├── layouts/                   # Custom Hugo HTML5 templates & partials
│   ├── _default/
│   │   ├── baseof.html        # HTML shell with Hugo Pipes asset processing
│   │   ├── single.html        # Standard prose template
│   │   └── list.html          # Fallback archive list
│   ├── partials/
│   │   ├── head.html          # SEO, metadata, and JSON-LD schema
│   │   ├── header.html        # Sticky glassmorphism navbar & theme toggle
│   │   ├── footer.html        # Multi-column footer & system status
│   │   └── cta-banner.html    # Reusable conversion banner
│   ├── services/              # Service templates
│   ├── case-studies/          # Case study templates
│   ├── blog/                  # Article & insights templates
│   ├── contact/               # Contact page template
│   ├── index.html             # Homepage layout
│   └── 404.html               # Developer terminal 404
├── static/
│   └── favicon.svg            # Browser vector icon
└── hugo.toml                  # Central configuration (branding, menus, contact info)
```

---

## 🛠️ Customization Guide

### Site Settings & Branding
Edit `hugo.toml` to customize:
- `company_name`: Business name (e.g. `Gooby Tech`)
- `tagline`: Business tagline
- `email`: Direct contact inbox (e.g. `hello@goobytech.com`)
- `phone`: Contact phone number
- `location`: Office location / timezone
- `availability`: Status badge text (e.g. `Accepting new projects for Q4 & 2027`)
- `calendly_url`: Direct booking link
- `formspree_endpoint`: (Optional) Formspree / Web3Forms endpoint URL to receive submissions directly via email

### Adding a New Service
Create a new Markdown file in `content/services/<slug>.md`:
```yaml
---
title: "Ruby on Rails Microservices"
description: "High-throughput Rails API backends."
weight: 70
tech_stack:
  - "Ruby on Rails"
  - "PostgreSQL"
  - "Sidekiq"
deliverables:
  - "RESTful API endpoints with JSON:API serialization"
  - "RSpec test coverage"
---
Your deep dive content here...
```

### Adding a Case Study
Create a new Markdown file in `content/case-studies/<slug>.md`:
```yaml
---
title: "Swift iOS Sensor Application"
description: "Real-time Bluetooth telemetry in Swift."
industry: "Swift (iOS) & TypeScript"
headline_metric: "Sub-Second Sync | 0 Crashes"
tech_stack:
  - "Swift 6"
  - "SwiftUI"
  - "TypeScript"
---
Case study details...
```

---

## 🚢 Deployment Options

Since this site generates pure static HTML/CSS/JS, it can be hosted on any edge CDN:

### Cloudflare Pages
- **Build command**: `hugo --minify`
- **Build output directory**: `public`
- **Environment variables**: `HUGO_VERSION = 0.168.0`

### Vercel / Netlify
- Push to GitHub and connect repository. Framework will auto-detect Hugo.

### GitHub Pages (via GitHub Actions)
Add `.github/workflows/deploy.yml` with the official Hugo starter action.
