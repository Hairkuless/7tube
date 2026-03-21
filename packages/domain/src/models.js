export const videoCategories = [
  'fitness',
  'productivity',
  'photography',
  'gaming',
  'education',
  'beauty'
];

export const userSegments = [
  'high-intent-shopper',
  'creator-pro',
  'casual-browser',
  'wellness-fan',
  'tech-enthusiast'
];

/**
 * @typedef {Object} Video
 * @property {string} id
 * @property {string} creatorHandle
 * @property {string} title
 * @property {string} category
 * @property {string[]} tags
 * @property {number} averageWatchPercent
 * @property {string[]} audienceSegments
 */

/**
 * @typedef {Object} AdCampaign
 * @property {string} id
 * @property {string} brand
 * @property {string[]} targetCategories
 * @property {string[]} targetTags
 * @property {string[]} targetSegments
 * @property {number} remainingBudget
 * @property {number} bidMultiplier
 */
