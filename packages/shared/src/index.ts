export type BrandSafetyLevel = 'relaxed' | 'standard' | 'strict';
export type AgeRange = '13-17' | '18-24' | '25-34' | '35-44';

export interface UserProfile {
  id: string;
  interests: string[];
  country: string;
  ageRange: AgeRange;
  brandSafetyLevel: BrandSafetyLevel;
}

export interface FeedVideo {
  id: string;
  title: string;
  creatorId: string;
  categories: string[];
  freshnessHours: number;
  engagementRate: number;
  averageWatchTime: number;
  monetizable: boolean;
}

export interface FeedRequest {
  user: UserProfile;
  videos: FeedVideo[];
}

export interface RankedFeedItem {
  videoId: string;
  title: string;
  score: number;
  reasons: string[];
}

export interface AdCampaign {
  id: string;
  advertiser: string;
  targetCategories: string[];
  targetCountries: string[];
  targetAgeRanges: AgeRange[];
  dailyBudgetRemaining: number;
  bidStrength: number;
  brandSafetyLevel: BrandSafetyLevel;
}

export interface CampaignMatchRequest {
  user: UserProfile;
  activeCategories: string[];
  campaigns: AdCampaign[];
}

export interface RankedCampaignMatch {
  campaignId: string;
  advertiser: string;
  score: number;
  reasons: string[];
}

const safetyRank: Record<BrandSafetyLevel, number> = {
  relaxed: 0,
  standard: 1,
  strict: 2,
};

function overlapScore(source: string[], target: string[]): number {
  if (source.length === 0 || target.length === 0) {
    return 0;
  }

  const overlap = source.filter((item) => target.includes(item)).length;
  return overlap / Math.max(source.length, target.length);
}

function freshnessScore(hours: number): number {
  return Math.max(0, 1 - hours / 24);
}

export function buildFeed({ user, videos }: FeedRequest): RankedFeedItem[] {
  const rankedVideos = videos
    .map((video) => {
      const interestMatch = overlapScore(user.interests, video.categories);
      const baseScore = Number(
        (
          interestMatch * 0.35 +
          video.averageWatchTime * 0.30 +
          video.engagementRate * 0.20 +
          freshnessScore(video.freshnessHours) * 0.15
        ).toFixed(3),
      );

      return {
        video,
        baseScore,
        reasons: [
          interestMatch > 0 ? 'interest-match' : 'exploration',
          video.averageWatchTime > 0.8 ? 'high-watch-time' : 'steady-watch-time',
          video.freshnessHours < 6 ? 'fresh-content' : 'aging-content',
        ],
      };
    })
    .sort((left, right) => right.baseScore - left.baseScore || left.video.id.localeCompare(right.video.id));

  const creatorFrequency = new Map<string, number>();
  const remainingVideos = [...rankedVideos];
  const rankedFeed: RankedFeedItem[] = [];

  while (remainingVideos.length > 0) {
    let nextIndex = 0;
    let nextScore = -Infinity;

    for (const [index, candidate] of remainingVideos.entries()) {
      const diversityPenalty = creatorFrequency.has(candidate.video.creatorId) ? 0.08 : 0;
      const adjustedScore = Number((candidate.baseScore - diversityPenalty).toFixed(3));

      if (
        adjustedScore > nextScore ||
        (adjustedScore === nextScore && candidate.baseScore > remainingVideos[nextIndex].baseScore) ||
        (adjustedScore === nextScore &&
          candidate.baseScore === remainingVideos[nextIndex].baseScore &&
          candidate.video.id.localeCompare(remainingVideos[nextIndex].video.id) < 0)
      ) {
        nextIndex = index;
        nextScore = adjustedScore;
      }
    }

    const [selectedVideo] = remainingVideos.splice(nextIndex, 1);
    creatorFrequency.set(selectedVideo.video.creatorId, (creatorFrequency.get(selectedVideo.video.creatorId) ?? 0) + 1);

    rankedFeed.push({
      videoId: selectedVideo.video.id,
      title: selectedVideo.video.title,
      score: nextScore,
      reasons: selectedVideo.reasons,
    });
  }

  return rankedFeed;
}

export function matchCampaigns({ user, activeCategories, campaigns }: CampaignMatchRequest): RankedCampaignMatch[] {
  return campaigns
    .filter((campaign) => {
      const countryMatch = campaign.targetCountries.includes(user.country);
      const ageMatch = campaign.targetAgeRanges.includes(user.ageRange);
      const safetyAllowed = safetyRank[campaign.brandSafetyLevel] <= safetyRank[user.brandSafetyLevel];

      return countryMatch && ageMatch && safetyAllowed;
    })
    .map((campaign) => {
      const interestMatch = overlapScore(user.interests, campaign.targetCategories);
      const activeCategoryMatch = overlapScore(activeCategories, campaign.targetCategories);
      const score = Number(
        (
          interestMatch * 0.40 +
          activeCategoryMatch * 0.25 +
          campaign.dailyBudgetRemaining * 0.15 +
          campaign.bidStrength * 0.20
        ).toFixed(3),
      );

      return {
        campaignId: campaign.id,
        advertiser: campaign.advertiser,
        score,
        reasons: [
          interestMatch > 0 ? 'audience-fit' : 'broad-reach',
          activeCategoryMatch > 0 ? 'contextual-fit' : 'category-expansion',
          campaign.dailyBudgetRemaining > 0.5 ? 'healthy-budget' : 'budget-constrained',
        ],
      };
    })
    .sort((left, right) => right.score - left.score);
}
