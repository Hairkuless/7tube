import test from 'node:test';
import assert from 'node:assert/strict';

import { buildFeed, matchCampaigns } from '../packages/shared/dist/index.js';

const user = {
  id: 'user-1',
  interests: ['music', 'gaming'],
  country: 'US',
  ageRange: '18-24',
  brandSafetyLevel: 'standard',
};

test('buildFeed ranks the strongest content first', () => {
  const result = buildFeed({
    user,
    videos: [
      {
        id: '1',
        title: 'Gaming clip',
        creatorId: 'a',
        categories: ['gaming'],
        freshnessHours: 1,
        engagementRate: 0.8,
        averageWatchTime: 0.95,
        monetizable: true,
      },
      {
        id: '2',
        title: 'Travel clip',
        creatorId: 'b',
        categories: ['travel'],
        freshnessHours: 20,
        engagementRate: 0.4,
        averageWatchTime: 0.45,
        monetizable: false,
      },
    ],
  });

  assert.equal(result[0]?.videoId, '1');
  assert.ok(result[0]?.reasons.includes('interest-match'));
});

test('matchCampaigns filters campaigns by user fit and safety', () => {
  const result = matchCampaigns({
    user,
    activeCategories: ['music'],
    campaigns: [
      {
        id: 'safe',
        advertiser: 'Safe Brand',
        targetCategories: ['music'],
        targetCountries: ['US'],
        targetAgeRanges: ['18-24'],
        dailyBudgetRemaining: 0.7,
        bidStrength: 0.8,
        brandSafetyLevel: 'standard',
      },
      {
        id: 'strict',
        advertiser: 'Strict Bank',
        targetCategories: ['finance'],
        targetCountries: ['US'],
        targetAgeRanges: ['18-24'],
        dailyBudgetRemaining: 0.9,
        bidStrength: 0.9,
        brandSafetyLevel: 'strict',
      },
    ],
  });

  assert.equal(result.length, 1);
  assert.equal(result[0]?.campaignId, 'safe');
});
