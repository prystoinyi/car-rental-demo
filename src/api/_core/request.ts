import { APIRequestError } from './errors';

type Fetcher = (headers: Headers) => Promise<Response>;

export async function request<TResponse>(fetcher: Fetcher): Promise<TResponse> {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  try {
    const response = await fetcher(headers);

    if (!response.ok) {
      throw new APIRequestError(`API request failed: ${response.status}`);
    }

    return response.json();
  } catch (e) {
    if (!(e instanceof APIRequestError)) {
      throw new APIRequestError('API request failed: unknown');
    }

    throw e;
  }
}
