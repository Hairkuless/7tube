# 7tube

7tube is a monorepo starter for a short-form video platform with a TikTok-style discovery experience, ad matching primitives, and production-minded architecture documentation.

## Repository structure

- `apps/web` — dependency-free TypeScript web client that renders a ranked feed, creator-studio summary, and ad insight cards.
- `apps/api` — dependency-free Node.js HTTP API that exposes feed ranking, ad matching, and health endpoints.
- `packages/shared` — shared domain models and ranking/ad-matching logic.
- `docs` — architecture notes and roadmap.
- `tests` — Node.js integration-style tests for the shared ranking primitives.

## Quick start

```bash
npm run build
npm run test
npm run dev
# open apps/web/dist/index.html in a browser after build
```

## Product pillars

- Personalized short-video feed ranking.
- Context-aware ad targeting with explainable scoring.
- Clear separation between product surfaces, domain logic, and platform documentation.
A scalable starter monorepo for **7tube**, a short-video platform with a TikTok-style feed, ads matching logic, and system design documentation.

## Repository layout

```text
7tube/
├── apps/
│   └── web/                # Static prototype for the creator/feed UI
├── services/
│   └── api/                # Node HTTP API for feed + ads matching
├── packages/
│   ├── domain/             # Shared domain models and sample data contracts
│   ├── shared/             # Reusable business logic (feed shaping, ad selection)
│   └── ui-tokens/          # Design tokens for future web/mobile clients
├── docs/                   # Product, architecture, and delivery docs
└── scripts/                # Build and validation utilities
```

## Quick start

### 1. Validate the workspace

```bash
npm run check
```

### 2. Build generated artifacts

```bash
npm run build
```

### 3. Start the API

```bash
npm run dev:api
```

Then open the static prototype from `apps/web/src/index.html` in your browser.

## What is included

- A monorepo structure that can grow into separate web, mobile, API, and shared packages.
- A working ad-matching engine stub that ranks ads by category, tags, budget, and watch-time affinity.
- A feed API that returns videos, suggested ads, and infrastructure metadata.
- Design tokens and architecture docs to guide the next implementation phase.

## Next implementation milestones

1. Replace the static web prototype with a real React/Next.js app.
2. Add authentication, creator onboarding, uploads, and moderation services.
3. Back the API with PostgreSQL, Redis, object storage, and an event bus.
4. Introduce Android/iOS apps that consume the shared contracts.
