import 'babel-polyfill';
import React                       from 'react';
import { render }                  from 'react-dom';
import {
  Router,
  browserHistory,
}                                  from 'react-router';
import { Provider }                from 'react-redux';
import injectStoreAndGetRoutes     from 'routes';
import axios                       from 'axios';
import { syncHistoryWithStore }    from 'react-router-redux';

import config                      from 'config';
import configureStore              from 'redux/configureStore';

axios.interceptors.request.use((axiosConfig) => {
  if (axiosConfig.url[0] === '/') {
    axiosConfig.url = config.apiBaseUrl + axiosConfig.url; // eslint-disable-line no-param-reassign
  }
  return axiosConfig;
});

// eslint-disable-next-line no-underscore-dangle
const store = configureStore(axios, window.__PRELOADED_STATE__);
const routes = injectStoreAndGetRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>,
  document.getElementById('react-view')
);
