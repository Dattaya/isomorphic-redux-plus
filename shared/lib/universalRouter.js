import React                  from 'react';
import {
  match,
  RouterContext,
  Router
}                             from 'react-router';
import { Provider }           from 'react-redux';

import ErrorHandler       from 'lib/ErrorHandler';
import fetchComponentData from './fetchComponentData';

/**
 *
 * @param routes
 * @param location
 * @param store
 * @param history
 * @param deferred If `true`, fetchDataDeferred is fetched without blocking (we want this behavior on the client).
 * @param preload If `true`, fetchComponentData will be called. Those two arguments (deferred, preload) were set to match the server defaults
 * @returns {Promise}
 */
export default function universalRouter({routes, location, store, history, deferred = false, preload = true}) {
  return new Promise((resolve, reject) => {
    match({routes, location, history}, (error, redirectLocation, renderProps) => {
      if (error) {
        return reject(error);
      }

      if (redirectLocation) {
        return resolve({
          redirectLocation
        });
      }

      if (preload) {
        fetchComponentData(store, renderProps.components, renderProps.params, renderProps.location.query, deferred)
          .then(() => resolveWithComponent())
          .catch((error) => {
            if (error && error.status && generateStatus(error.status.toString())) {
              resolveWithComponent(generateStatus(error.status.toString()));
            } else {
              reject(error)
            }
          });
      } else {
        resolveWithComponent();
      }

      function resolveWithComponent(status) {
        const component = (
          <Provider store={store}>
            <ErrorHandler status={status}>
              <RouterContext {...renderProps}/>
            </ErrorHandler>
          </Provider>
        );
        resolve({component, matchedRoutes: renderProps.routes, status})
      }
    });
  });
}

const statusTable = {
  '':  null,
  '4': 404,
  '5': 500
};

function generateStatus(status) {
  return statusTable[status] ? statusTable[status] : generateStatus(status.slice(0, -1));
}
