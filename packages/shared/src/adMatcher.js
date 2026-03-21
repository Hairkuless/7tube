const normalizeScore = (value, max) => Number(Math.min(1, value / max).toFixed(2));

export const scoreAdForVideo = (video, ad) => {
  const categoryScore = ad.targetCategories.includes(video.category) ? 35 : 0;
  const tagMatches = video.tags.filter((tag) => ad.targetTags.includes(tag)).length;
  const tagScore = tagMatches * 15;
  const segmentMatches = video.audienceSegments.filter((segment) => ad.targetSegments.includes(segment)).length;
  const segmentScore = segmentMatches * 20;
  const watchTimeScore = Math.round(video.averageWatchPercent * 20);
  const budgetScore = Math.min(10, Math.round(ad.remainingBudget / 3000));
  const safetyScore = video.brandSafety === 'safe' ? 10 : video.brandSafety === 'review' ? 4 : -20;

  const rawScore = categoryScore + tagScore + segmentScore + watchTimeScore + budgetScore + safetyScore;
  const weightedScore = rawScore * ad.bidMultiplier;

  return {
    adId: ad.id,
    brand: ad.brand,
    rawScore,
    normalizedScore: normalizeScore(weightedScore, 120),
    objective: ad.objective,
    matchedSignals: {
      category: categoryScore > 0,
      tagMatches,
      segmentMatches,
      watchTimeScore,
      budgetScore,
      safetyScore
    },
    explanation: buildAdExplanation(ad, video, { categoryScore, tagMatches, segmentMatches, safetyScore })
  };
};

export const selectBestAd = (video, ads) => {
  const rankedAds = ads
    .map((ad) => scoreAdForVideo(video, ad))
    .sort((left, right) => right.normalizedScore - left.normalizedScore);

  return rankedAds[0];
};

export const buildFeedResponse = (videos, ads, creators = []) => ({
  generatedAt: new Date().toISOString(),
  items: videos.map((video) => ({
    ...video,
    creator: creators.find((creator) => creator.handle === video.creatorHandle) ?? null,
    recommendedAd: selectBestAd(video, ads)
  })),
  infrastructureHints: [
    'CDN-backed video playback with adaptive bitrate ladders',
    'Event stream for impressions, watch events, and creator actions',
    'Redis cache for hot feed candidates and pacing counters',
    'Ranking jobs for personalization, safety scoring, and ad pacing'
  ]
});

const buildAdExplanation = (ad, video, scoringBreakdown) => {
  const reasons = [];

  if (scoringBreakdown.categoryScore) {
    reasons.push(`category match for ${video.category}`);
  }
  if (scoringBreakdown.tagMatches > 0) {
    reasons.push(`${scoringBreakdown.tagMatches} tag match${scoringBreakdown.tagMatches > 1 ? 'es' : ''}`);
  }
  if (scoringBreakdown.segmentMatches > 0) {
    reasons.push(`${scoringBreakdown.segmentMatches} audience overlap`);
  }
  if (scoringBreakdown.safetyScore > 0) {
    reasons.push('brand-safe placement');
  }

  return reasons.length > 0 ? `${ad.brand} ranked highest due to ${reasons.join(', ')}.` : `${ad.brand} won on pacing and bid multiplier.`;
};
