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
  'tech-enthusiast',
  'trend-seeker'
];

export const campaignObjectives = ['awareness', 'conversions', 'app-installs'];

/**
 * @typedef {Object} Video
 * @property {string} id
 * @property {string} creatorHandle
 * @property {string} title
 * @property {string} category
 * @property {string[]} tags
 * @property {number} averageWatchPercent
 * @property {string[]} audienceSegments
 * @property {number} durationSeconds
 * @property {number} viewsLast24h
 * @property {'safe'|'review'|'restricted'} brandSafety
 */

/**
 * @typedef {Object} CreatorProfile
 * @property {string} handle
 * @property {string} displayName
 * @property {number} followers
 * @property {number} weeklyPosts
 * @property {string[]} strengths
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
 * @property {'awareness'|'conversions'|'app-installs'} objective
 */
