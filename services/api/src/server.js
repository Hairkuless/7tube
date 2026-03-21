import http from 'node:http';
import { sampleAds, sampleVideos, buildFeedResponse, selectBestAd } from '../../../packages/shared/src/index.js';

const port = Number(process.env.PORT || 7070);

const sendJson = (response, payload, statusCode = 200) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
};

const routes = {
  '/health': (_request, response) => {
    sendJson(response, {
      service: '7tube-api',
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  },
  '/api/feed': (_request, response) => {
    sendJson(response, buildFeedResponse(sampleVideos, sampleAds));
  },
  '/api/ads/preview': (_request, response) => {
    const preview = sampleVideos.map((video) => ({
      videoId: video.id,
      creator: video.creatorHandle,
      ad: selectBestAd(video, sampleAds)
    }));

    sendJson(response, { preview });
  }
};

const server = http.createServer((request, response) => {
  if (!request.url) {
    sendJson(response, { error: 'Missing URL' }, 400);
    return;
  }

  const pathname = new URL(request.url, `http://${request.headers.host || 'localhost'}`).pathname;
  const handler = routes[pathname];

  if (!handler) {
    sendJson(response, {
      error: 'Not found',
      availableRoutes: Object.keys(routes)
    }, 404);
    return;
  }

  handler(request, response);
});

server.listen(port, () => {
  console.log(`7tube API listening on http://localhost:${port}`);
});
