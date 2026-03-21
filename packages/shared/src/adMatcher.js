const normalizeScore = (value, max) => Number((value / max).toFixed(2));

export const scoreAdForVideo = (video, ad) => {
  const categoryScore = ad.targetCategories.includes(video.category) ? 35 : 0;
  const tagMatches = video.tags.filter((tag) => ad.targetTags.includes(tag)).length;
  const tagScore = tagMatches * 15;
  const segmentMatches = video.audienceSegments.filter((segment) => ad.targetSegments.includes(segment)).length;
  const segmentScore = segmentMatches * 20;
  const watchTimeScore = Math.round(video.averageWatchPercent * 20);
  const budgetScore = Math.min(10, Math.round(ad.remainingBudget / 3000));

  const rawScore = categoryScore + tagScore + segmentScore + watchTimeScore + budgetScore;

  return {
    adId: ad.id,
    brand: ad.brand,
    rawScore,
    normalizedScore: normalizeScore(rawScore * ad.bidMultiplier, 100),
    matchedSignals: {
      category: categoryScore > 0,
      tagMatches,
      segmentMatches,
      watchTimeScore,
      budgetScore
    }
  };
};

export const selectBestAd = (video, ads) => {
  const rankedAds = ads
    .map((ad) => scoreAdForVideo(video, ad))
    .sort((left, right) => right.normalizedScore - left.normalizedScore);

  return rankedAds[0];
};

export const buildFeedResponse = (videos, ads) => ({
  generatedAt: new Date().toISOString(),
  items: videos.map((video) => ({
    ...video,
    recommendedAd: selectBestAd(video, ads)
  })),
  infrastructureHints: [
    'CDN-backed video playback',
    'Event stream for impressions and watch events',
    'Redis cache for hot feed candidates',
    'Ranking jobs for personalization and ad pacing'
  ]
});
