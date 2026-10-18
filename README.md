# Gooby Tech — Software Engineering Services Website

A production-grade, ultra-fast Hugo website engineered for software engineering consultancies, cloud architects, and technical service businesses.

Built with **zero external npm runtime dependencies**, leveraging **Hugo Pipes** for asset fingerprinting, minification, and sub-50ms static builds.

---

## ⚡ Key Highlights & Features

- **Blazing Fast**: Compiles in **< 50 milliseconds** with Hugo extended.
- **Deep Tech Visual Aesthetic**: Sleek developer-first dark mode by default with persistent dark/light theme switching.
- **Comprehensive Structure**:
  - **Homepage**: High-impact value proposition hero, live availability status, key metrics strip, core service previews, interactive tech stack matrix with category tabs, client testimonials, and engineering workflow.
  - **Services Section (`/services/`)**: Detailed deep dives for 6 core software engineering services (deliverables checklist, outcomes, tech stack badges, and FAQs).
  - **Case Studies (`/case-studies/`)**: Real-world architectural breakdowns detailing client challenges, technical architectures, stack choices, quantitative ROI metrics, and client endorsements.
  - **Engineering Insights / Blog (`/blog/`)**: Technical articles with estimated reading time, author metadata, tags, and syntax-highlighted code blocks with "Copy" buttons.
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
│   │   ├── full-stack-web-apps.md
│   │   ├── cloud-architecture-devops.md
│   │   ├── distributed-systems-apis.md
│   │   ├── ai-machine-learning-engineering.md
│   │   ├── security-performance-audits.md
│   │   └── fractional-cto-advisory.md
│   ├── case-studies/          # Quantified technical case studies
│   │   ├── fintech-realtime-settlement-engine.md
│   │   ├── healthtech-hipaa-cloud-modernization.md
│   │   └── ecommerce-distributed-inventory-scaling.md
│   └── blog/                  # Technical thought-leadership articles
│       ├── architecting-sub-10ms-apis-with-go-and-redis.md
│       ├── building-production-ready-rag-pipelines.md
│       └── from-monolith-to-modular-monolith-a-practical-guide.md
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
title: "Mobile App Development (React Native & Flutter)"
description: "Cross-platform mobile applications engineered for high performance."
weight: 70
tech_stack:
  - "React Native"
  - "Flutter"
  - "TypeScript"
deliverables:
  - "iOS and Android production release"
  - "Offline-first SQLite sync"
---
Your deep dive content here...
```

### Adding a Case Study
Create a new Markdown file in `content/case-studies/<slug>.md`:
```yaml
---
title: "Global Video Streaming Infrastructure"
description: "Optimizing WebRTC media pipelines."
industry: "Media & Streaming"
headline_metric: "< 150ms Glass-to-Glass Latency"
tech_stack:
  - "Rust"
  - "WebRTC"
  - "Kubernetes"
---
Case study details...
```

---

## 🚢 Deployment Options

Since this site generates pure, static HTML/CSS/JS, it can be hosted on any edge CDN for free or pennies per month:

### Cloudflare Pages
- **Build command**: `hugo --minify`
- **Build output directory**: `public`
- **Environment variables**: `HUGO_VERSION = 0.168.0`

### Vercel / Netlify
- Push to GitHub and connect repository. Framework will auto-detect Hugo.

### GitHub Pages (via GitHub Actions)
Add `.github/workflows/deploy.yml` with the official Hugo starter action.
