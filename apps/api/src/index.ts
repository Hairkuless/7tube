import { createServer } from 'node:http';

import { getAdMatches, getFeed } from './data.js';

const port = Number(process.env.PORT ?? 4000);

const server = createServer((_request, response) => {
  const url = _request.url ?? '/';
  let payload: unknown;

  if (url === '/health') {
    payload = { status: 'ok', service: '7tube-api' };
  } else if (url === '/feed') {
    payload = { items: getFeed() };
  } else if (url === '/ads/matches') {
    payload = { items: getAdMatches() };
  } else {
    response.statusCode = 404;
    payload = { error: 'Not found' };
  }

  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload, null, 2));
});

server.listen(port, () => {
  console.log(`7tube API running on http://localhost:${port}`);
});
