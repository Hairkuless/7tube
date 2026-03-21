# 7tube System Architecture

## Core domains

1. **Discovery Feed**
   - Scores videos using watch-time affinity, engagement velocity, freshness, and creator diversity.
2. **Ads Matching**
   - Ranks campaigns based on audience overlap, category fit, spend pacing, and safety constraints.
3. **Creator Studio**
   - Gives creators visibility into content performance and monetization readiness.

## Monorepo design

- `apps/web` owns interaction flows and UI composition.
- `apps/api` exposes product-facing services and orchestrates domain logic.
- `packages/shared` keeps ranking logic testable and reusable across services.

## Suggested next steps

- Add persistence for users, videos, campaigns, and events.
- Stream watch events into a feature store.
- Add moderation and brand-safety review queues.
- Introduce experimentation support for ranking model variants.
