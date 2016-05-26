import 'babel-polyfill';
import React                       from 'react';
import { render }                  from 'react-dom';
import {
  Router,
  browserHistory,
}                                  from 'react-router';
import { Provider }                from 'react-redux';
import * as reducers               from 'reducers';
import injectStoreAndGetRoutes     from 'routes';
import {
  createStore,
  combineReducers,
  applyMiddleware
}                                  from 'redux';
import axios                       from 'axios';

import immutifyState               from 'lib/immutifyState';
import injectAxiosAndGetMiddleware from 'lib/promiseMiddleware';
import config                      from 'config';

axios.interceptors.request.use(function (axiosConfig) {
  if (axiosConfig.url[0] === '/') {
    axiosConfig.url = config.apiBaseUrl + axiosConfig.url;
  }
  return axiosConfig;
});

const initialState = immutifyState(window.__INITIAL_STATE__);

const reducer = combineReducers(reducers);
const promiseMiddleware = injectAxiosAndGetMiddleware(axios);
const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);
const routes = injectStoreAndGetRoutes(store);

render(
  <Provider store={store}>
    <Router history={browserHistory} children={routes} />
  </Provider>,
  document.getElementById('react-view')
);
