import React                       from 'react';
import { Route, IndexRoute }       from 'react-router';

import App                             from 'components/App';
import Todos                           from 'components/Todos';
import About                           from 'components/About';
import NotFound                        from 'components/NotFound';
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
    <Route name="app" component={App} path="/" onEnter={loadAuth}>
      <IndexRoute component={About}/>
      <Route path="todos" component={Todos}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
