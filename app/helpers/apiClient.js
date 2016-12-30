import axios from 'axios';
import config from 'config';

export default function createApi(req) {
  const client = axios.create();
  client.interceptors.request.use((axiosConfig) => {
    if (axiosConfig.url[0] !== '/') {
      return axiosConfig;
    }

    if (__CLIENT__) {
      return Object.assign({}, axiosConfig, { url: config.apiBaseUrl + axiosConfig.url });
    }

    return Object.assign({}, axiosConfig, {
      url: `http://${config.host}:${config.port}${config.apiBaseUrl}${axiosConfig.url}`,
      headers: req.headers,
    });
  });
  return client;
}


export const client = createApi();
