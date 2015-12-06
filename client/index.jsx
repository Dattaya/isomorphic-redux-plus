import 'babel/polyfill';
import React                       from 'react';
import { render }                  from 'react-dom';
import { Router }                  from 'react-router';
import createBrowserHistory        from 'history/lib/createBrowserHistory'
import { Provider }                from 'react-redux';
import { fromJS }                  from 'immutable';
import * as reducers               from 'reducers';
import injectStoreAndGetRoutes     from 'routes';
import injectAxiosAndGetMiddleware from 'lib/promiseMiddleware';
import immutifyState               from 'lib/immutifyState';
import { createStore,
         combineReducers,
         applyMiddleware }         from 'redux';
import axios                       from 'axios';

axios.interceptors.request.use(function (config) {
  if (config.url[0] === '/') {
    config.url = '/api/1' + config.url;
  }
  return config;
});

const initialState = immutifyState(window.__INITIAL_STATE__);

const history = createBrowserHistory();

const reducer = combineReducers(reducers);
const promiseMiddleware = injectAxiosAndGetMiddleware(axios);
const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);
const routes = injectStoreAndGetRoutes(store);

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
