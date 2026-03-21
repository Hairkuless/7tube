const feedEntries = [
  {
    creator: '@fitloop',
    title: '5 quick stretches for desk workers',
    category: 'fitness',
    watchTime: '86%',
    status: 'High retention',
    tags: ['wellness', 'mobility', 'habit'],
    ad: {
      brand: 'FlexBand Pro',
      score: 0.92,
      reason: 'Matched to fitness category + mobility tags'
    }
  },
  {
    creator: '@bytechef',
    title: '3 AI prompts to speed up content scripting',
    category: 'productivity',
    watchTime: '71%',
    status: 'Emerging trend',
    tags: ['ai', 'creator-tools', 'workflow'],
    ad: {
      brand: 'PromptStack',
      score: 0.87,
      reason: 'Relevant to creator tools and high conversion segment'
    }
  },
  {
    creator: '@streetframe',
    title: 'Night photography with a budget lens',
    category: 'photography',
    watchTime: '79%',
    status: 'Brand-safe',
    tags: ['camera', 'low-light', 'gear'],
    ad: {
      brand: 'LumaGlass',
      score: 0.81,
      reason: 'Aligned with camera gear audience and spend budget'
    }
  }
];

const feedElement = document.querySelector('#feed');

feedElement.innerHTML = feedEntries
  .map(
    (entry) => `
      <article class="card feed-item">
        <div class="video-frame">
          <div>
            <span class="video-chip">${entry.creator}</span>
            <h2>${entry.title}</h2>
            <span class="status-chip">${entry.status}</span>
          </div>
        </div>

        <div class="item-meta">
          <div>
            <p class="muted">Category</p>
            <strong>${entry.category}</strong>
          </div>
          <div>
            <p class="muted">Watch time</p>
            <strong>${entry.watchTime}</strong>
          </div>
        </div>

        <div class="tag-list">
          ${entry.tags.map((tag) => `<span class="tag">#${tag}</span>`).join('')}
        </div>

        <div class="ad-card">
          <p class="eyebrow">Recommended ad</p>
          <h3>${entry.ad.brand}</h3>
          <p class="muted">${entry.ad.reason}</p>
          <span class="ad-score">Score: ${entry.ad.score.toFixed(2)}</span>
        </div>
      </article>
    `
  )
  .join('');
