# 7tube architecture snapshot

## Goals

- Deliver a short-video platform with a fast personalized feed, creator tooling, and explainable ad decisions.
- Keep the repository ready for multi-team development across frontend, backend, and shared contracts.
- Make the prototype runnable without external infrastructure while still reflecting realistic production boundaries.

## Current repository layers

### 1. `apps/web`
- Browser-rendered control center that visualizes platform metrics, roadmap stages, creator data, infrastructure hints, and feed/ad decisions.
- Reads from the local API when available and falls back to in-repo seed data for offline preview.

### 2. `services/api`
- Lightweight Node HTTP API.
- Routes:
  - `/health`
  - `/api/feed`
  - `/api/ads/preview`
  - `/api/platform/overview`
- Adds route metadata, CORS headers, and query-driven filtering for the feed endpoint.

### 3. `packages/shared`
- Seed data for videos, creators, ads, and top-level platform metrics.
- Feed assembly that enriches each video with creator details and a recommended ad.
- Explainable ad scoring logic to show why a campaign was selected.

### 4. `packages/config`
- Central location for environment URLs, feature flags, SLOs, and roadmap stages.
- Intended to become the seed for environment-aware deployment configuration.

### 5. `packages/domain`
- Shared domain vocabulary for videos, creators, ad campaigns, and category enums.

## Production-oriented target system

```text
Clients (Web / iOS / Android)
        |
        v
 API Gateway / Edge Auth
        |
        +--> Feed API ----> Candidate Store / Ranking Service / Redis
        |
        +--> Ads API -----> Campaign Store / Budget Pacing / Safety Filters
        |
        +--> Creator API -> Profile Store / Analytics / Notifications
        |
        +--> Moderation ---> Policy Engine / Review Queue / Audit Log
        |
        v
 Event Bus / Stream Processing / Data Warehouse / Experimentation
```

## Suggested next technical upgrades

1. Replace seed data with persistence layers for creators, videos, and campaigns.
2. Add typed API contracts and schema validation for request params and responses.
3. Introduce a modern frontend framework and shared component library.
4. Split business logic into dedicated services once traffic patterns justify it.
5. Add observability: structured logs, traces, dashboards, and error budgets.
