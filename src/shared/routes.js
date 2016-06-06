import React                       from 'react';
import { Route, IndexRoute }       from 'react-router';

import {
  App, Todos, About, ErrorPage,
}                                      from 'components';
import { loadAuth }                    from 'redux/auth/actions';
import { isLoaded }                    from 'redux/auth/selectors';

export default (store) => {
  const loadAuthData = (nextState, replaceState, next) => {
    if (!isLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(() => next());
    } else {
      next();
    }
  };

  return (
    <Route name="app" component={App} path="/" onEnter={loadAuthData}>
      <IndexRoute component={About} />
      <Route path="todos" component={Todos} />
      <Route path="*" component={ErrorPage} status={404} />
    </Route>
  );
};
