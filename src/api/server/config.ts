const API_URL = process.env.NEXT_PRIVATE_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PRIVATE_API_URL is required');
}

export { API_URL };
