import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

import createInjectMiddleware from 'lib/promiseMiddleware';
import reducer from 'reducer';

export default function configureStore(injections, preloadedState = {}) {
  const middleware = [
    applyMiddleware(createInjectMiddleware(injections), thunk),
  ];

  if (typeof window !== 'undefined' && window.devToolsExtension) {
    middleware.push(window.devToolsExtension());
  }

  const state = Object.assign({}, preloadedState, {
    pageStatus: fromJS(preloadedState.pageStatus),
    auth: fromJS(preloadedState.auth),
    todo: fromJS(preloadedState.todo),
    about: fromJS(preloadedState.about),
  });

  const finalCreateStore = compose(...middleware)(createStore);

  const store = finalCreateStore(reducer, state);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducer', () => {
      const nextReducer = require('reducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
