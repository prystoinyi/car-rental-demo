import { request } from './request';

type RequestOptions = Omit<RequestInit, 'method' | 'body' | 'headers'>;

export function get<TResponse>(
  url: string,
  params: Record<string, any> = {},
  options?: RequestOptions,
): Promise<TResponse> {
  return request<TResponse>((headers) => {
    return fetch(
      url + '?' + (new URLSearchParams(params)).toString(),
      {
        ...options,
        method: 'GET',
        headers,
      }
    );
  });
}

export function post<TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  options?: RequestOptions,
): Promise<TResponse> {
  return request<TResponse>((headers) => {
    return fetch(url, {
      ...options,
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  });
}
