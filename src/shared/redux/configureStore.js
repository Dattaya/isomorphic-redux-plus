import {
  createStore,
  applyMiddleware,
  compose,
}                  from 'redux';
import thunk       from 'redux-thunk';

import injectClientAndGetMiddleware from 'redux/middlewares/promiseMiddleware';
import reducer                      from 'redux/reducer';

export default function configureStore(client, preloadedState) {
  const finalCreateStore = compose(
    applyMiddleware(injectClientAndGetMiddleware(client), thunk),
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, preloadedState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('redux/reducer', () => {
      const nextReducer = require('redux/reducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
