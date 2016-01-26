import 'babel-polyfill';
import React                       from 'react';
import { render }                  from 'react-dom';
import {
  Router,
  browserHistory as history,
  match
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
import universalRouter             from 'lib/universalRouter';

axios.interceptors.request.use(function (config) {
  if (config.url[0] === '/') {
    config.url = '/api/1' + config.url;
  }
  return config;
});

const { pathname, search } = window.location;

const initialState = immutifyState(window.__INITIAL_STATE__);

const reducer = combineReducers(reducers);
const promiseMiddleware = injectAxiosAndGetMiddleware(axios);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);
const routes = injectStoreAndGetRoutes(store);

const renderApp = (location, preload) => {
  return universalRouter({routes, location, store, history, deferred: true, preload})
    .then(({component}) => {
      render(component, document.getElementById('react-view'));
    })
    .catch(console.error.bind(console));
};

history.listenBefore((location, callback) => {
  renderApp(location, true)
    .then(callback);
});

// can't use `false` for `preload` as this would break symmetry and `fetchComponentData`...`catch` wouldn't be called.
// need to find a workaround.
renderApp(pathname + search, true);
