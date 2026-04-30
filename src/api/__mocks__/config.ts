import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const API_URL = process.env.NEXT_PRIVATE_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PRIVATE_API_URL is required');
}

const url = new URL(API_URL);

const API_ORIGIN = url.origin;
const API_HOST = url.hostname;
const API_PORT = Number(url.port);

export { API_ORIGIN, API_HOST, API_PORT };
