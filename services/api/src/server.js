import http from 'node:http';
import { platformConfig, roadmapStages } from '../../../packages/config/src/index.js';
import {
  creatorProfiles,
  platformMetrics,
  sampleAds,
  sampleVideos,
  buildFeedResponse,
  selectBestAd
} from '../../../packages/shared/src/index.js';

const port = Number(process.env.PORT || 7070);

const sendJson = (response, payload, statusCode = 200) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store'
  });
  response.end(JSON.stringify(payload, null, 2));
};

const sendNoContent = (response) => {
  response.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  response.end();
};

const withMeta = (payload) => ({
  meta: {
    platform: platformConfig.name,
    environment: process.env.NODE_ENV || 'development',
    generatedAt: new Date().toISOString()
  },
  ...payload
});

const handleFeed = (requestUrl, response) => {
  const limit = Math.max(1, Math.min(12, Number(requestUrl.searchParams.get('limit') || sampleVideos.length)));
  const category = requestUrl.searchParams.get('category');
  const filteredVideos = sampleVideos
    .filter((video) => (category ? video.category === category : true))
    .slice(0, limit);

  sendJson(response, withMeta(buildFeedResponse(filteredVideos, sampleAds, creatorProfiles)));
};

const handleAdsPreview = (requestUrl, response) => {
  const videoId = requestUrl.searchParams.get('videoId');
  const targetVideos = videoId ? sampleVideos.filter((video) => video.id === videoId) : sampleVideos;

  sendJson(
    response,
    withMeta({
      preview: targetVideos.map((video) => ({
        videoId: video.id,
        creator: video.creatorHandle,
        title: video.title,
        ad: selectBestAd(video, sampleAds)
      }))
    })
  );
};

const routes = {
  '/health': (_requestUrl, response) => {
    sendJson(
      response,
      withMeta({
        service: '7tube-api',
        status: 'ok',
        dependencies: {
          feedContracts: 'loaded',
          adMatcher: 'loaded',
          featureFlags: Object.values(platformConfig.featureFlags).every(Boolean) ? 'enabled' : 'partial'
        }
      })
    );
  },
  '/api/feed': (requestUrl, response) => handleFeed(requestUrl, response),
  '/api/ads/preview': (requestUrl, response) => handleAdsPreview(requestUrl, response),
  '/api/platform/overview': (_requestUrl, response) => {
    sendJson(
      response,
      withMeta({
        metrics: platformMetrics,
        creators: creatorProfiles,
        roadmap: roadmapStages,
        serviceLevelObjectives: platformConfig.serviceLevelObjectives
      })
    );
  }
};

const server = http.createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    sendNoContent(response);
    return;
  }

  if (!request.url) {
    sendJson(response, withMeta({ error: 'Missing URL' }), 400);
    return;
  }

  const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const handler = routes[requestUrl.pathname];

  if (!handler) {
    sendJson(
      response,
      withMeta({
        error: 'Not found',
        availableRoutes: Object.keys(routes)
      }),
      404
    );
    return;
  }

  handler(requestUrl, response);
});

server.listen(port, () => {
  console.log(`7tube API listening on http://localhost:${port}`);
});
