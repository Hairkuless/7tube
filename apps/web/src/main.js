const fallbackData = {
  meta: {
    environment: 'offline-preview'
  },
  metrics: {
    dailyActiveViewers: 182400,
    creatorsEarningThisMonth: 1240,
    adsFillRate: 0.934,
    averageSessionMinutes: 14.6,
    moderationSlaMinutes: 18,
    experimentsRunning: 7
  },
  creators: [
    {
      handle: '@fitloop',
      displayName: 'Fit Loop',
      followers: 128400,
      weeklyPosts: 12,
      strengths: ['habit-forming hooks', 'wellness explainers']
    },
    {
      handle: '@bytechef',
      displayName: 'Byte Chef',
      followers: 84210,
      weeklyPosts: 9,
      strengths: ['AI workflows', 'creator productivity']
    }
  ],
  roadmap: [
    {
      name: 'Foundation',
      focus: 'Monorepo setup, feed contracts, API bootstrap, design system',
      status: 'in-progress'
    },
    {
      name: 'Growth systems',
      focus: 'Creator analytics, campaigns, experimentation, notifications',
      status: 'planned'
    }
  ],
  feed: {
    items: [
      {
        id: 'vid_fit_001',
        creatorHandle: '@fitloop',
        title: '5 quick stretches for desk workers',
        category: 'fitness',
        tags: ['wellness', 'mobility', 'habit'],
        averageWatchPercent: 0.86,
        durationSeconds: 42,
        viewsLast24h: 182000,
        brandSafety: 'safe',
        creator: {
          displayName: 'Fit Loop',
          followers: 128400
        },
        recommendedAd: {
          brand: 'FlexBand Pro',
          normalizedScore: 0.93,
          objective: 'conversions',
          explanation: 'FlexBand Pro ranked highest due to category match for fitness, 2 tag matches, 1 audience overlap, brand-safe placement.'
        }
      },
      {
        id: 'vid_prod_014',
        creatorHandle: '@bytechef',
        title: '3 AI prompts to speed up content scripting',
        category: 'productivity',
        tags: ['ai', 'creator-tools', 'workflow'],
        averageWatchPercent: 0.71,
        durationSeconds: 58,
        viewsLast24h: 129000,
        brandSafety: 'safe',
        creator: {
          displayName: 'Byte Chef',
          followers: 84210
        },
        recommendedAd: {
          brand: 'PromptStack',
          normalizedScore: 0.9,
          objective: 'app-installs',
          explanation: 'PromptStack ranked highest due to category match for productivity, 3 tag matches, 2 audience overlap, brand-safe placement.'
        }
      }
    ],
    infrastructureHints: [
      'CDN-backed video playback with adaptive bitrate ladders',
      'Event stream for impressions, watch events, and creator actions',
      'Redis cache for hot feed candidates and pacing counters',
      'Ranking jobs for personalization, safety scoring, and ad pacing'
    ]
  }
};

const state = {
  overview: fallbackData,
  feed: fallbackData.feed,
  apiReachable: false
};

const elements = {
  metricGrid: document.querySelector('#metric-grid'),
  roadmapList: document.querySelector('#roadmap-list'),
  creatorList: document.querySelector('#creator-list'),
  feed: document.querySelector('#feed'),
  infrastructureList: document.querySelector('#infrastructure-list'),
  apiStatus: document.querySelector('#api-status')
};

const formatCompactNumber = (value) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
const formatPercent = (value) => `${Math.round(value * 100)}%`;

const renderMetrics = (metrics) => {
  const cards = [
    ['Daily active viewers', formatCompactNumber(metrics.dailyActiveViewers)],
    ['Creators earning this month', formatCompactNumber(metrics.creatorsEarningThisMonth)],
    ['Ads fill rate', formatPercent(metrics.adsFillRate)],
    ['Average session', `${metrics.averageSessionMinutes}m`],
    ['Moderation SLA', `${metrics.moderationSlaMinutes}m`],
    ['Experiments live', String(metrics.experimentsRunning)]
  ];

  elements.metricGrid.innerHTML = cards
    .map(
      ([label, value]) => `
        <article class="metric-card">
          <span class="metric-label">${label}</span>
          <strong>${value}</strong>
        </article>
      `
    )
    .join('');
};

const renderRoadmap = (roadmap) => {
  elements.roadmapList.innerHTML = roadmap
    .map(
      (stage) => `
        <article class="info-row">
          <div>
            <h3>${stage.name}</h3>
            <p class="muted">${stage.focus}</p>
          </div>
          <span class="status-pill ${stage.status === 'in-progress' ? 'active' : ''}">${stage.status}</span>
        </article>
      `
    )
    .join('');
};

const renderCreators = (creators) => {
  elements.creatorList.innerHTML = creators
    .map(
      (creator) => `
        <article class="info-row creator-row">
          <div>
            <h3>${creator.displayName}</h3>
            <p class="muted">${creator.handle} · ${formatCompactNumber(creator.followers)} followers</p>
            <p class="muted">Strengths: ${creator.strengths.join(', ')}</p>
          </div>
          <span class="metric-inline">${creator.weeklyPosts}/wk</span>
        </article>
      `
    )
    .join('');
};

const renderInfrastructure = (items) => {
  elements.infrastructureList.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
};

const renderFeed = (items) => {
  elements.feed.innerHTML = items
    .map(
      (entry) => `
      <article class="card feed-item">
        <div class="video-frame category-${entry.category}">
          <div>
            <div class="video-header-row">
              <span class="video-chip">${entry.creatorHandle}</span>
              <span class="status-pill ${entry.brandSafety === 'safe' ? 'active' : 'review'}">${entry.brandSafety}</span>
            </div>
            <h2>${entry.title}</h2>
            <p class="muted">${entry.creator?.displayName ?? entry.creatorHandle} · ${formatCompactNumber(entry.viewsLast24h)} views in 24h</p>
          </div>
        </div>

        <div class="item-meta">
          <div>
            <p class="muted">Category</p>
            <strong>${entry.category}</strong>
          </div>
          <div>
            <p class="muted">Avg. watch</p>
            <strong>${formatPercent(entry.averageWatchPercent)}</strong>
          </div>
          <div>
            <p class="muted">Duration</p>
            <strong>${entry.durationSeconds}s</strong>
          </div>
        </div>

        <div class="tag-list">
          ${entry.tags.map((tag) => `<span class="tag">#${tag}</span>`).join('')}
        </div>

        <div class="ad-card">
          <div class="section-heading compact">
            <div>
              <p class="eyebrow">Recommended ad</p>
              <h3>${entry.recommendedAd.brand}</h3>
            </div>
            <span class="metric-inline">${Math.round(entry.recommendedAd.normalizedScore * 100)} score</span>
          </div>
          <p class="muted">Objective: ${entry.recommendedAd.objective}</p>
          <p>${entry.recommendedAd.explanation}</p>
        </div>
      </article>
    `
    )
    .join('');
};

const setApiStatus = (reachable, environment) => {
  elements.apiStatus.textContent = reachable ? `API online · ${environment}` : 'Offline fallback';
  elements.apiStatus.className = `status-pill ${reachable ? 'active' : 'review'}`;
};

const loadJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.json();
};

const bootstrap = async () => {
  try {
    const [overview, feed] = await Promise.all([
      loadJson('http://127.0.0.1:7070/api/platform/overview'),
      loadJson('http://127.0.0.1:7070/api/feed')
    ]);

    state.overview = overview;
    state.feed = feed;
    state.apiReachable = true;
  } catch (error) {
    console.warn('7tube UI fallback mode enabled.', error);
  }

  renderMetrics(state.overview.metrics);
  renderRoadmap(state.overview.roadmap);
  renderCreators(state.overview.creators);
  renderInfrastructure(state.feed.infrastructureHints);
  renderFeed(state.feed.items);
  setApiStatus(state.apiReachable, state.overview.meta?.environment ?? fallbackData.meta.environment);
};

bootstrap();
