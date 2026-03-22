export const videos = [
  {
    id: 'vid-sneaker-drop',
    category: 'fashion',
    creatorTags: ['streetwear', 'sneakers'],
    averageWatchPercent: 0.82,
  },
  {
    id: 'vid-kitchen-hack',
    category: 'food',
    creatorTags: ['cooking', 'meal-prep'],
    averageWatchPercent: 0.54,
  },
];

export const ads = [
  {
    id: 'ad-active-fashion',
    brand: 'Pulse Kicks',
    category: 'fashion',
    targetTags: ['streetwear', 'sneakers'],
    targetWatchPercent: 0.8,
    bidMultiplier: 1.2,
    remainingBudget: 400,
  },
  {
    id: 'ad-spent-fashion',
    brand: 'Budget Burn',
    category: 'fashion',
    targetTags: ['streetwear', 'sneakers'],
    targetWatchPercent: 0.82,
    bidMultiplier: 1.4,
    remainingBudget: 0,
  },
  {
    id: 'ad-food',
    brand: 'Prep Pro',
    category: 'food',
    targetTags: ['cooking'],
    targetWatchPercent: 0.5,
    bidMultiplier: 1.05,
    remainingBudget: 250,
  }
];
