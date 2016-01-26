import React                       from 'react';
import { Route, IndexRoute }       from 'react-router';

import {
  App, Todos, About, NotFound, Todo,
  InternalServerError
}                                      from 'components';
import { loadAuth as loadAuthActionC } from 'actions/AuthActions';

export default (store) => {
  const loadAuth = (nextState, replaceState, next) => {
    if (!store.getState().auth.get('loaded')) {
      store.dispatch(loadAuthActionC()).then(() => next());
    } else {
      next();
    }
  };

  return (
    <Route component={App} path="/" onEnter={loadAuth}>
      <IndexRoute component={About}/>
      <Route path="todos" component={Todos}/>
      <Route path="todos/:id" component={Todo}/>
      <Route path="/__500" component={InternalServerError} status={500}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
