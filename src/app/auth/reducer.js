import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOAD_AUTH,
  LOGIN_REQUEST,
  LOGIN,
  LOGOUT,
} from './types';

const defaultState = Map({
  user: null,
  loaded: false,
  loggingIn: false,
  error: false,
});

export default handleActions({
  [LOAD_AUTH]: (state, { payload }) =>
    state.merge({ loaded: true, user: payload || null }),

  [LOGIN_REQUEST]: (state) =>
    state.set('loggingIn', true),

  [LOGIN]: (state, { error, payload }) =>
    (error ? state.merge({
      loggingIn: false,
      user: null,
      error: true,
    }) : state.merge({
      loggingIn: false,
      user: payload || null,
      error: false,
    })),

  [LOGOUT]: (state) =>
    state.set('user', null),
}, defaultState);
