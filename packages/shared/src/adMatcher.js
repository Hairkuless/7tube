const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const countSharedTags = (left = [], right = []) => left.filter((tag) => right.includes(tag)).length;

export function scoreAdForVideo(video, ad) {
  if (!video || !ad || ad.remainingBudget <= 0) {
    return null;
  }

  const categoryScore = video.category === ad.category ? 45 : 0;
  const sharedTags = countSharedTags(video.creatorTags, ad.targetTags);
  const tagScore = sharedTags * 15;
  const watchAffinity = 1 - Math.abs(video.averageWatchPercent - ad.targetWatchPercent);
  const watchTimeScore = clamp(watchAffinity) * 20;
  const budgetScore = Math.min(ad.remainingBudget / 20, 10);
  const rawScore = categoryScore + tagScore + watchTimeScore + budgetScore;
  const weightedScore = rawScore * ad.bidMultiplier;
  const normalizedScore = clamp(weightedScore / 100);

  return {
    adId: ad.id,
    brand: ad.brand,
    rawScore,
    weightedScore,
    normalizedScore,
    breakdown: {
      categoryScore,
      tagScore,
      watchTimeScore,
      budgetScore,
    },
  };
}

export function selectBestAd(video, candidateAds) {
  return candidateAds
    .map((ad) => scoreAdForVideo(video, ad))
    .filter(Boolean)
    .sort((left, right) => {
      if (right.weightedScore !== left.weightedScore) {
        return right.weightedScore - left.weightedScore;
      }

      return right.normalizedScore - left.normalizedScore;
    })[0] ?? null;
}
