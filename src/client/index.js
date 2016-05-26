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

import immutifyState               from 'lib/immutifyState';
import config                      from 'config';
import configureStore              from 'redux/configureStore';

axios.interceptors.request.use(function (axiosConfig) {
  if (axiosConfig.url[0] === '/') {
    axiosConfig.url = config.apiBaseUrl + axiosConfig.url;
  }
  return axiosConfig;
});

const store = configureStore(axios, immutifyState(window.__INITIAL_STATE__));

const routes = injectStoreAndGetRoutes(store);

render(
  <Provider store={store}>
    <Router history={browserHistory} children={routes} />
  </Provider>,
  document.getElementById('react-view')
);
