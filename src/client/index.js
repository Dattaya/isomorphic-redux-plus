import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {
  Router,
  browserHistory,
} from 'react-router';
import { Provider } from 'react-redux';
import injectStoreAndGetRoutes from 'routes';
import { syncHistoryWithStore } from 'react-router-redux';

import createApi from 'helpers/apiClient';
import config from '../config';
const client = createApi(config.apiBaseUrl);

import configureStore from 'helpers/configureStore';
import { ReduxAsyncConnect } from 'redux-connect';

const store = configureStore(
  { client }, window.__PRELOADED_STATE__  // eslint-disable-line no-underscore-dangle
);
const routes = injectStoreAndGetRoutes(store);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.get('routing').toObject(),
});

const reloadOnPropsChange = (props, nextProps) =>
  props.location.pathname !== nextProps.location.pathname;

render(
  <Provider store={store}>
    <Router
      render={(props) =>
        <ReduxAsyncConnect
          {...props}
          reloadOnPropsChange={reloadOnPropsChange}
          helpers={{ client }}
        />
      }
      history={history}
      children={routes}
    />
  </Provider>,
  document.getElementById('react-view')
);
