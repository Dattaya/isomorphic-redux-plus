import React                  from 'react';
import {
  match,
  RouterContext,
  Router
}                             from 'react-router';
import { Provider }           from 'react-redux';

import fetchComponentData from './fetchComponentData';

/**
 *
 * @param routes
 * @param location
 * @param store
 * @param history
 * @param deferred is not implemented yet. If `true`, deferred data is fetched without blocking (we want this behavior on the client).
 * @param preload If `true`, fetchComponentData will be called. Those two arguments (deferred, preload) were set to match the server defaults
 * @returns {Promise}
 */
export default function universalRouter({routes, location, store, history, deferred = false, preload = true}) {
  const rematch = (location, resolve, reject, rematched = false) => {
    const handleError = (error) => {
      if (rematched) {
        return reject(error);
      }
      rematch(getErrorPagePath(error.status.toString() || '500'), resolve, reject, true);
    };

    match({routes, location, history}, (error, redirectLocation, renderProps) => {
      if (error) {
        // this error shouldn't happen in production, but let's try to handle it anyway
        return handleError(error);
      }

      if (redirectLocation) {
        return resolve({
          redirectLocation
        });
      }

      if (preload) {
        fetchComponentData(store, renderProps.components, renderProps.params, renderProps.location.query, deferred)
          .then(resolveWithComponent)
          .catch(handleError);
      } else {
        resolveWithComponent();
      }

      function resolveWithComponent() {
        // TODO try...catch here + handleError?
        const component = (
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        );
        resolve({component, matchedRoutes: renderProps.routes})
      }
    });
  };

  return new Promise((resolve, reject) => {
    rematch(location, resolve, reject);
  });
}

// empty string '' indicates status by default
const statusTable = {
  '':  '/__404',
  '5': '/__500'
};

function getErrorPagePath(status) {
  return statusTable[status] ? statusTable[status] : getErrorPagePath(status.slice(0, -1));
}
