import axios from 'axios';

export function transformRequest(prefix, req) {
  return (config) => {
    if (config.url[0] !== '/') {
      return config;
    }

    const headers = req.headers || config.headers;
    const url = prefix + config.url;

    return { ...config, headers, url };
  };
}

export function transformResponse({ data }) {
  return data;
}

export default function createApi(prefix, req = {}) {
  const client = axios.create();

  client.interceptors.request.use(transformRequest(prefix, req));
  client.interceptors.response.use(transformResponse);

  return client;
}


export const client = createApi();
