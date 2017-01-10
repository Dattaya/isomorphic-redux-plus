import { Map } from 'immutable';

import {
  LOAD_AUTH,
  LOGIN_REQUEST,
  LOGIN,
  LOGOUT,
} from './types';

const defaultState = Map({ loaded: false, user: null });

export default function authReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_AUTH:
      return state.merge({ loaded: true, user: action.payload || null });

    case LOGIN_REQUEST:
      return state.set('loggingIn', true);

    case LOGIN:
      return action.error
        ? state.merge({ loggingIn: false, user: null, error: true })
        : state.merge({ loggingIn: false, user: action.payload || null, error: false });

    case LOGOUT:
      return state.set('user', null);

    default:
      return state;
  }
}
