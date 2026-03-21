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
