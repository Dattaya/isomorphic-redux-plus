import React                       from 'react';
import { Route, IndexRoute }       from 'react-router';

import {
  App, Todos, About, ErrorPage,
}                                      from 'components';
import { loadAuth as loadAuthActionC } from 'redux/actions/AuthActions';

export default (store) => {
  const loadAuth = (nextState, replaceState, next) => {
    if (!store.getState().auth.loaded) {
      store.dispatch(loadAuthActionC()).then(() => next());
    } else {
      next();
    }
  };

  return (
    <Route name="app" component={App} path="/" onEnter={loadAuth}>
      <IndexRoute component={About} />
      <Route path="todos" component={Todos} />
      <Route path="*" component={ErrorPage} status={404} />
    </Route>
  );
};
