import {
  createStore,
  applyMiddleware,
  compose,
}                  from 'redux';
import thunk       from 'redux-thunk';

import injectClientAndGetMiddleware from 'lib/promiseMiddleware';
import reducer                      from 'reducer';

export default function configureStore(client, preloadedState) {
  const finalCreateStore = compose(
    applyMiddleware(injectClientAndGetMiddleware(client), thunk),
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, preloadedState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducer', () => {
      const nextReducer = require('reducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
