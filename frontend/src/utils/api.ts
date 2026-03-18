const API_BASE_URL = 'http://localhost/tastybite/backend/api';

interface FetchOptions extends RequestInit {
  data?: any;
}

export const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const { data, headers, ...restOptions } = options;

  const requestOptions: RequestInit = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    
    // In PHP, empty responses might not be valid JSON, so we handle text first.
    const text = await response.text();
    if (!text) return null as T;

    const json = JSON.parse(text);

    if (!response.ok) {
      throw new Error(json.message || `HTTP error! status: ${response.status}`);
    }

    return json as T;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => fetchApi<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, data: any, options?: RequestInit) => fetchApi<T>(endpoint, { ...options, method: 'POST', data }),
  put: <T>(endpoint: string, data: any, options?: RequestInit) => fetchApi<T>(endpoint, { ...options, method: 'PUT', data }),
  delete: <T>(endpoint: string, data?: any, options?: RequestInit) => fetchApi<T>(endpoint, { ...options, method: 'DELETE', data }),
};
