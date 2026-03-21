# 7tube

A repository foundation for **7tube**, a short-video platform that now includes a richer web control-center prototype, a multi-route Node API, shared ranking/ads logic, and implementation docs for future product phases.

## Repository layout

```text
7tube/
├── apps/
│   └── web/                # API-aware control center / feed prototype
├── services/
│   └── api/                # Node HTTP API for feed, ads preview, and platform overview
├── packages/
│   ├── config/             # Feature flags, environment config, roadmap stages
│   ├── domain/             # Shared domain models and contracts
│   ├── shared/             # Feed seed data, creator metrics, ad ranking logic
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

### 4. Open the web prototype

Open `apps/web/src/index.html` in your browser.

- When the API is running on `http://127.0.0.1:7070`, the UI loads live JSON from `/api/platform/overview` and `/api/feed`.
- When the API is unavailable, the UI falls back to repository seed data so the prototype still renders.

## Included capabilities

- **API-backed frontend prototype** with operational metrics, roadmap cards, creator highlights, infrastructure notes, and feed/ad recommendation cards.
- **Expanded API surface** with routes for health, filtered feed retrieval, ad previews, and platform overview metadata.
- **Shared business logic** for creator-aware feed assembly and explainable ad ranking.
- **Centralized product config** for feature flags, environments, SLOs, and roadmap stages.
- **Build outputs** that package both the web source and docs into `dist/` along with a generated manifest.

## API routes

| Route | Purpose |
| --- | --- |
| `/health` | Health and dependency status |
| `/api/feed?limit=3&category=fitness` | Feed payload with creator + recommended ad enrichment |
| `/api/ads/preview?videoId=vid_fit_001` | Best ad recommendation for one or more videos |
| `/api/platform/overview` | Dashboard metrics, creator profiles, roadmap, SLOs |

## Next implementation milestones

1. Replace the static browser-open workflow with a bundled React or Next.js app.
2. Add persistence for creators, videos, ad campaigns, and moderation queues.
3. Introduce event ingestion, experimentation config, and recommendation pipelines.
4. Add Android/iOS apps that consume the shared contracts and platform config.
