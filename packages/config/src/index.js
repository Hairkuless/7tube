export const platformConfig = {
  name: '7tube',
  environments: {
    development: {
      apiBaseUrl: 'http://127.0.0.1:7070',
      webBaseUrl: 'file:///apps/web/src/index.html'
    },
    production: {
      apiBaseUrl: 'https://api.7tube.example',
      webBaseUrl: 'https://app.7tube.example'
    }
  },
  featureFlags: {
    creatorAnalytics: true,
    adMarketplacePreview: true,
    moderationInbox: true,
    feedExperiments: true
  },
  serviceLevelObjectives: {
    feedApiP95Ms: 180,
    playbackStartP95Ms: 250,
    adDecisionP95Ms: 120
  }
};

export const roadmapStages = [
  {
    id: 'stage-foundation',
    name: 'Foundation',
    focus: 'Monorepo setup, feed contracts, API bootstrap, design system',
    status: 'in-progress'
  },
  {
    id: 'stage-growth',
    name: 'Growth systems',
    focus: 'Creator analytics, campaigns, experimentation, notifications',
    status: 'planned'
  },
  {
    id: 'stage-scale',
    name: 'Scale & trust',
    focus: 'Moderation automation, billing, subscriptions, ML ranking',
    status: 'planned'
  }
];
