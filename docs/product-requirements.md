# 7tube product requirements snapshot

## Product vision

7tube is a short-video platform focused on fast creator growth loops, trustworthy monetization, and operational visibility for teams shipping the platform.

## Primary user groups

1. **Viewers** need a personalized, high-retention feed with fast playback.
2. **Creators** need visibility into what is performing and how to earn.
3. **Ads / growth teams** need confident, explainable campaign placements.
4. **Operations teams** need metrics, roadmap visibility, and moderation status at a glance.

## MVP requirements

### Feed experience
- Show a ranked list of videos with creator context and performance signals.
- Surface watch-rate, category, and safety state in each card.
- Attach a recommended ad decision with a human-readable explanation.

### Platform operations
- Show daily active viewers, creator monetization progress, ad fill rate, moderation SLA, and active experiments.
- Surface roadmap stages and key architecture hints for planning.

### API requirements
- Expose a health route.
- Expose a filterable feed endpoint.
- Expose ad preview data for debugging campaign targeting.
- Expose platform overview data for internal dashboards.

## Non-functional requirements
- Prototype must run locally without a database.
- Repository structure must support future web/mobile/backend separation.
- Shared logic must be reusable across services and clients.
- Build output must be easy to inspect in CI or by humans.
