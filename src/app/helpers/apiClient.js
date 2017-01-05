import axios from 'axios';

export default function createApi(prefix, req) {
  const client = axios.create();
  client.interceptors.request.use((axiosConfig) => {
    if (axiosConfig.url[0] !== '/') {
      return axiosConfig;
    }
    return Object.assign({}, axiosConfig, {
      url: prefix + axiosConfig.url,
      headers: req && req.headers || axiosConfig.headers,
    });
  });
  return client;
}


export const client = createApi();
