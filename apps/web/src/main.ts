import { buildFeed, matchCampaigns, type AdCampaign, type FeedVideo, type UserProfile } from '../../../packages/shared/src/index.js';

const user: UserProfile = {
  id: 'demo-user',
  interests: ['gaming', 'music', 'fashion'],
  country: 'US',
  ageRange: '18-24',
  brandSafetyLevel: 'standard',
};

const videos: FeedVideo[] = [
  {
    id: 'vid-1',
    title: 'Speedrun secrets in 30 seconds',
    creatorId: 'creator-a',
    categories: ['gaming'],
    freshnessHours: 2,
    engagementRate: 0.86,
    averageWatchTime: 0.92,
    monetizable: true,
  },
  {
    id: 'vid-2',
    title: 'Streetwear fit breakdown',
    creatorId: 'creator-b',
    categories: ['fashion'],
    freshnessHours: 7,
    engagementRate: 0.72,
    averageWatchTime: 0.78,
    monetizable: true,
  },
  {
    id: 'vid-3',
    title: 'Indie artist hook challenge',
    creatorId: 'creator-c',
    categories: ['music'],
    freshnessHours: 1,
    engagementRate: 0.76,
    averageWatchTime: 0.88,
    monetizable: false,
  },
];

const campaigns: AdCampaign[] = [
  {
    id: 'ad-1',
    advertiser: 'Pulse Energy',
    targetCategories: ['gaming'],
    targetCountries: ['US'],
    targetAgeRanges: ['18-24'],
    dailyBudgetRemaining: 0.8,
    bidStrength: 0.84,
    brandSafetyLevel: 'standard',
  },
  {
    id: 'ad-2',
    advertiser: 'Nova Headphones',
    targetCategories: ['music', 'fashion'],
    targetCountries: ['US'],
    targetAgeRanges: ['18-24'],
    dailyBudgetRemaining: 0.62,
    bidStrength: 0.78,
    brandSafetyLevel: 'relaxed',
  },
 ];

const feed = buildFeed({ user, videos });
const campaignMatches = matchCampaigns({ user, activeCategories: ['gaming', 'music'], campaigns: [...campaigns] });

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root not found');
}

app.innerHTML = `
  <main class="app-shell">
    <section class="hero panel">
      <div>
        <p class="eyebrow">7tube platform blueprint</p>
        <h1>Short-form video discovery with explainable feed and ad ranking.</h1>
        <p class="lede">
          This starter repo demonstrates the core surfaces needed for a TikTok-style product: a ranked feed,
          creator-facing visibility, and campaign scoring.
        </p>
      </div>
      <div class="hero-metrics">
        <div class="metric">
          <span>${feed[0]?.score ?? '0.000'}</span>
          <small>Top feed score</small>
        </div>
        <div class="metric">
          <span>${campaignMatches[0]?.score ?? '0.000'}</span>
          <small>Top ad match</small>
        </div>
      </div>
    </section>

    <section class="grid three-up">
      <article class="panel tile">
        <p class="eyebrow">TikTok-style flow</p>
        <h2>Swipe feed</h2>
        <ul>
          <li>Intent-aware ranking</li>
          <li>Freshness and creator diversity</li>
          <li>Monetization-ready inventory</li>
        </ul>
      </article>
      <article class="panel tile">
        <p class="eyebrow">Ads engine</p>
        <h2>Campaign matching</h2>
        <ul>
          <li>Audience overlap and contextual fit</li>
          <li>Budget pacing awareness</li>
          <li>Brand-safety gating</li>
        </ul>
      </article>
      <article class="panel tile">
        <p class="eyebrow">Creator studio</p>
        <h2>Performance signals</h2>
        <ul>
          <li>Watch-time quality</li>
          <li>Engagement momentum</li>
          <li>Monetization status</li>
        </ul>
      </article>
    </section>

    <section class="content-grid">
      <div>
        <div class="section-header">
          <p class="eyebrow">Discovery feed</p>
          <h2>Ranked video queue</h2>
        </div>
        <div class="stack">
          ${feed
            .map(
              (item) => `
                <article class="panel card">
                  <div class="chip">${item.videoId}</div>
                  <h3>${item.title}</h3>
                  <p>Rank score: ${item.score}</p>
                  <p>Signals: ${item.reasons.join(' · ')}</p>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>

      <div>
        <div class="section-header">
          <p class="eyebrow">Ad relevance</p>
          <h2>Recommended campaigns</h2>
        </div>
        <div class="stack">
          ${campaignMatches
            .map(
              (match) => `
                <article class="panel card alt">
                  <div class="chip">${match.advertiser}</div>
                  <h3>${match.campaignId}</h3>
                  <p>Campaign score: ${match.score}</p>
                  <p>Signals: ${match.reasons.join(' · ')}</p>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  </main>
`;
