import assert from 'node:assert/strict';
import { ads, scoreAdForVideo, selectBestAd, videos } from '../packages/shared/src/index.js';

const [fashionVideo, foodVideo] = videos;
const spentCampaign = ads.find((ad) => ad.id === 'ad-spent-fashion');
const activeFashionCampaign = ads.find((ad) => ad.id === 'ad-active-fashion');
const foodCampaign = ads.find((ad) => ad.id === 'ad-food');

assert.equal(scoreAdForVideo(fashionVideo, spentCampaign), null, 'spent campaigns should be excluded entirely');

const bestFashionAd = selectBestAd(fashionVideo, ads);
assert.equal(bestFashionAd?.adId, 'ad-active-fashion', 'selectBestAd should skip exhausted campaigns');
assert.ok(bestFashionAd.normalizedScore >= 0 && bestFashionAd.normalizedScore <= 1, 'normalizedScore must stay in the 0..1 range');

const foodScore = scoreAdForVideo(foodVideo, foodCampaign);
const offTargetScore = scoreAdForVideo(foodVideo, activeFashionCampaign);
assert.ok(foodScore.breakdown.watchTimeScore > offTargetScore.breakdown.watchTimeScore, 'watch-time affinity should differentiate ads for the same video');

console.log('checks passed');
