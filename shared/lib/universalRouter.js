import React                  from 'react';
import {
  match,
  RouterContext,
}                             from 'react-router';
import { Provider }           from 'react-redux';

import ErrorHandler       from 'lib/ErrorHandler';
import fetchComponentData from 'lib/fetchComponentData';

/**
 *
 * @param routes
 * @param location
 * @param store
 * @param history
 * @param deferred If `true`, fetchDataDeferred is fetched without blocking (we want this behavior on the client).
 * @param initialStatus If present, fetchComponentData will NOT be called, instead, the page will be loaded that matches the initial status.
 * @returns {Promise}
 */
export default function universalRouter({routes, location, store, history, deferred = false, initialStatus}) {
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

      if (initialStatus) {
        resolveWithComponent(initialStatus);
      } else {
        fetchComponentData(store, renderProps.components, renderProps.params, renderProps.location.query, deferred)
          .then(() => resolveWithComponent(getRouteStatus(renderProps.routes)))
          .catch((error) => {
            if (error && error.status && generateStatusFromApi(error.status.toString())) {
              resolveWithComponent(generateStatusFromApi(error.status.toString()));
            } else {
              reject(error)
            }
          });
      }

      function resolveWithComponent(status) {
        const component = (
          <Provider store={store}>
            <ErrorHandler status={status}>
              <RouterContext {...renderProps}/>
            </ErrorHandler>
          </Provider>
        );
        resolve({component, status})
      }
    });
  });
}

const statusTable = {
  '':  null,
  '4': 404,
  '5': 500
};

function generateStatusFromApi(status) {
  return statusTable[status] ? statusTable[status] : generateStatusFromApi(status.slice(0, -1));
}

function getRouteStatus(routes) {
  return routes.reduce((prev, curr) => curr.status || prev, 200);
}
