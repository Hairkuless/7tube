import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { buildFeedResponse, sampleAds, sampleVideos, selectBestAd } = await import('../packages/shared/src/index.js');

assert.equal(sampleVideos.length, 3, 'Expected seeded videos');
assert.equal(sampleAds.length, 3, 'Expected seeded ads');

const bestAd = selectBestAd(sampleVideos[0], sampleAds);
assert.equal(bestAd.brand, 'FlexBand Pro', 'Fitness video should prefer FlexBand Pro');

const feed = buildFeedResponse(sampleVideos, sampleAds);
assert.equal(feed.items.length, sampleVideos.length, 'Feed item count should match input videos');
assert.ok(feed.items.every((item) => item.recommendedAd?.brand), 'Each feed item should include a recommended ad');

const tokens = JSON.parse(readFileSync(new URL('../packages/ui-tokens/tokens.json', import.meta.url), 'utf8'));
assert.equal(tokens.color.accent, '#7c5cff', 'Accent token should match the UI theme');

console.log('Workspace checks passed.');
