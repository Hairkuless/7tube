export const creatorProfiles = [
  {
    handle: '@fitloop',
    displayName: 'Fit Loop',
    followers: 128400,
    weeklyPosts: 12,
    strengths: ['habit-forming hooks', 'wellness explainers', 'retention']
  },
  {
    handle: '@bytechef',
    displayName: 'Byte Chef',
    followers: 84210,
    weeklyPosts: 9,
    strengths: ['AI workflows', 'creator productivity', 'tool reviews']
  },
  {
    handle: '@streetframe',
    displayName: 'Street Frame',
    followers: 65300,
    weeklyPosts: 6,
    strengths: ['camera storytelling', 'gear recommendations', 'night shooting']
  },
  {
    handle: '@playwise',
    displayName: 'Play Wise',
    followers: 210900,
    weeklyPosts: 15,
    strengths: ['gaming clips', 'community retention', 'daily series']
  }
];

export const sampleVideos = [
  {
    id: 'vid_fit_001',
    creatorHandle: '@fitloop',
    title: '5 quick stretches for desk workers',
    category: 'fitness',
    tags: ['wellness', 'mobility', 'habit'],
    averageWatchPercent: 0.86,
    audienceSegments: ['wellness-fan', 'casual-browser'],
    durationSeconds: 42,
    viewsLast24h: 182000,
    brandSafety: 'safe'
  },
  {
    id: 'vid_prod_014',
    creatorHandle: '@bytechef',
    title: '3 AI prompts to speed up content scripting',
    category: 'productivity',
    tags: ['ai', 'creator-tools', 'workflow'],
    averageWatchPercent: 0.71,
    audienceSegments: ['creator-pro', 'tech-enthusiast'],
    durationSeconds: 58,
    viewsLast24h: 129000,
    brandSafety: 'safe'
  },
  {
    id: 'vid_photo_031',
    creatorHandle: '@streetframe',
    title: 'Night photography with a budget lens',
    category: 'photography',
    tags: ['camera', 'low-light', 'gear'],
    averageWatchPercent: 0.79,
    audienceSegments: ['high-intent-shopper', 'tech-enthusiast'],
    durationSeconds: 47,
    viewsLast24h: 98000,
    brandSafety: 'safe'
  },
  {
    id: 'vid_game_052',
    creatorHandle: '@playwise',
    title: 'Best 3 settings for smoother ranked matches',
    category: 'gaming',
    tags: ['fps', 'setup', 'competitive'],
    averageWatchPercent: 0.83,
    audienceSegments: ['trend-seeker', 'casual-browser'],
    durationSeconds: 39,
    viewsLast24h: 244000,
    brandSafety: 'review'
  }
];

export const sampleAds = [
  {
    id: 'ad_flexband',
    brand: 'FlexBand Pro',
    targetCategories: ['fitness'],
    targetTags: ['mobility', 'wellness'],
    targetSegments: ['wellness-fan'],
    remainingBudget: 18000,
    bidMultiplier: 1.2,
    objective: 'conversions'
  },
  {
    id: 'ad_promptstack',
    brand: 'PromptStack',
    targetCategories: ['productivity', 'education'],
    targetTags: ['ai', 'workflow', 'creator-tools'],
    targetSegments: ['creator-pro', 'tech-enthusiast'],
    remainingBudget: 24000,
    bidMultiplier: 1.1,
    objective: 'app-installs'
  },
  {
    id: 'ad_lumaglass',
    brand: 'LumaGlass',
    targetCategories: ['photography'],
    targetTags: ['camera', 'gear'],
    targetSegments: ['high-intent-shopper'],
    remainingBudget: 15000,
    bidMultiplier: 1.05,
    objective: 'conversions'
  },
  {
    id: 'ad_orbitx',
    brand: 'OrbitX',
    targetCategories: ['gaming'],
    targetTags: ['fps', 'competitive'],
    targetSegments: ['trend-seeker', 'casual-browser'],
    remainingBudget: 21000,
    bidMultiplier: 1.15,
    objective: 'awareness'
  }
];

export const platformMetrics = {
  dailyActiveViewers: 182400,
  creatorsEarningThisMonth: 1240,
  adsFillRate: 0.934,
  averageSessionMinutes: 14.6,
  moderationSlaMinutes: 18,
  experimentsRunning: 7
};
