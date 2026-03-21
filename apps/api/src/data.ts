import type { AdCampaign, FeedRequest, FeedVideo, UserProfile } from '../../../packages/shared/src/index.js';
import { buildFeed, matchCampaigns } from '../../../packages/shared/src/index.js';

export const demoUser: UserProfile = {
  id: 'user-1',
  interests: ['gaming', 'music', 'fashion'],
  country: 'US',
  ageRange: '18-24',
  brandSafetyLevel: 'standard',
};

export const videos: FeedVideo[] = [
  {
    id: 'vid-1',
    title: 'Speedrun secrets in 30 seconds',
    creatorId: 'creator-a',
    categories: ['gaming'],
    freshnessHours: 3,
    engagementRate: 0.83,
    averageWatchTime: 0.91,
    monetizable: true,
  },
  {
    id: 'vid-2',
    title: 'Streetwear fit breakdown',
    creatorId: 'creator-b',
    categories: ['fashion'],
    freshnessHours: 8,
    engagementRate: 0.71,
    averageWatchTime: 0.75,
    monetizable: true,
  },
  {
    id: 'vid-3',
    title: 'Indie artist hook challenge',
    creatorId: 'creator-c',
    categories: ['music'],
    freshnessHours: 1,
    engagementRate: 0.77,
    averageWatchTime: 0.88,
    monetizable: false,
  },
  {
    id: 'vid-4',
    title: 'Underrated co-op games this week',
    creatorId: 'creator-a',
    categories: ['gaming'],
    freshnessHours: 16,
    engagementRate: 0.64,
    averageWatchTime: 0.69,
    monetizable: true,
  },
];

export const campaigns: AdCampaign[] = [
  {
    id: 'ad-1',
    advertiser: 'Pulse Energy',
    targetCategories: ['gaming', 'fitness'],
    targetCountries: ['US', 'CA'],
    targetAgeRanges: ['18-24', '25-34'],
    dailyBudgetRemaining: 0.74,
    bidStrength: 0.86,
    brandSafetyLevel: 'standard',
  },
  {
    id: 'ad-2',
    advertiser: 'Nova Headphones',
    targetCategories: ['music', 'fashion'],
    targetCountries: ['US'],
    targetAgeRanges: ['18-24'],
    dailyBudgetRemaining: 0.58,
    bidStrength: 0.82,
    brandSafetyLevel: 'relaxed',
  },
  {
    id: 'ad-3',
    advertiser: 'Core Bank',
    targetCategories: ['finance'],
    targetCountries: ['US'],
    targetAgeRanges: ['25-34'],
    dailyBudgetRemaining: 0.91,
    bidStrength: 0.92,
    brandSafetyLevel: 'strict',
  },
];

export function getFeed(request: FeedRequest = { user: demoUser, videos }) {
  return buildFeed(request);
}

export function getAdMatches() {
  return matchCampaigns({
    user: demoUser,
    activeCategories: ['gaming', 'music'],
    campaigns,
  });
}
