import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const {
  buildFeedResponse,
  creatorProfiles,
  platformMetrics,
  sampleAds,
  sampleVideos,
  selectBestAd
} = await import('../packages/shared/src/index.js');
const { platformConfig, roadmapStages } = await import('../packages/config/src/index.js');

assert.equal(sampleVideos.length, 4, 'Expected expanded seeded videos');
assert.equal(sampleAds.length, 4, 'Expected expanded seeded ads');
assert.ok(creatorProfiles.length >= 4, 'Expected creator profiles for dashboard rendering');

const bestFitnessAd = selectBestAd(sampleVideos[0], sampleAds);
assert.equal(bestFitnessAd.brand, 'FlexBand Pro', 'Fitness video should prefer FlexBand Pro');

const bestGamingAd = selectBestAd(sampleVideos[3], sampleAds);
assert.equal(bestGamingAd.brand, 'OrbitX', 'Gaming video should prefer OrbitX');
assert.ok(bestGamingAd.explanation.includes('category match'), 'Ranked ads should include an explanation');

const feed = buildFeedResponse(sampleVideos, sampleAds, creatorProfiles);
assert.equal(feed.items.length, sampleVideos.length, 'Feed item count should match input videos');
assert.ok(feed.items.every((item) => item.recommendedAd?.brand), 'Each feed item should include a recommended ad');
assert.ok(feed.items.every((item) => item.creator?.displayName), 'Each feed item should include creator data');
assert.ok(feed.infrastructureHints.length >= 4, 'Feed should expose infrastructure hints');

assert.equal(platformConfig.featureFlags.adMarketplacePreview, true, 'Ad marketplace preview flag should be enabled');
assert.ok(roadmapStages.some((stage) => stage.status === 'in-progress'), 'Roadmap should include an in-progress stage');
assert.ok(platformMetrics.dailyActiveViewers > 100000, 'Platform metrics should be populated');

const tokens = JSON.parse(readFileSync(new URL('../packages/ui-tokens/tokens.json', import.meta.url), 'utf8'));
assert.equal(tokens.color.accent, '#7c5cff', 'Accent token should match the UI theme');

console.log('Workspace checks passed.');
