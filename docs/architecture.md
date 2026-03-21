# 7tube architecture blueprint

## Core domains

- **Experience layer**: Web, Android, and iOS clients that render the vertical short-video feed and creator tools.
- **Edge/API layer**: API gateway, BFFs, auth, throttling, request tracing, and feature flags.
- **Platform services**: Feed ranking, ads matching, search, notifications, moderation, creator monetization.
- **Data and media**: PostgreSQL for transactional data, Redis for caching, object storage for assets, and a CDN for video delivery.
- **Analytics**: Event ingestion pipeline, warehouse exports, experiment analysis, and creator dashboards.

## Service topology

```text
Clients -> API Gateway -> Feed Service -> Ranking Pipeline -> Cache/DB
                       -> Ads Service  -> Campaign Store -> Budget Pacing
                       -> Media Service -> Object Storage -> CDN
                       -> Analytics Ingest -> Queue/Stream -> Warehouse
```

## Recommended delivery phases

1. **Platform MVP**
   - Authentication, profiles, uploads, moderation queue.
   - Feed retrieval with fallback ranking rules.
   - Initial ad campaign ingestion and matching.
2. **Growth systems**
   - Experimentation, notifications, social graph signals.
   - Segmentation, better pacing, creator analytics.
3. **Optimization**
   - ML-driven recommendations, fraud controls, subscriptions, advanced monetization.

## Non-functional goals

- P95 feed response under 250 ms for cached requests.
- Observability coverage across API latency, playback quality, and ad delivery.
- Safe rollout with feature flags, canaries, and per-market configuration.
