import express from 'express';

import { API_ORIGIN, API_PORT } from './config';
import { router } from './routes';

const DELAY_MS = 150;

const app = express();

app.use(express.json());

app.use((_req, _res, next) => {
  setTimeout(next, DELAY_MS);
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(router);

app.use((request, response) => {
  response.status(404).json({
    message: `Mock endpoint not found: ${request.method} ${request.path}`,
  });
});

console.log(API_PORT);

const server = app.listen(API_PORT, () => {
  console.info(`[mock-api] running on ${API_ORIGIN}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
