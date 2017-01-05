import {
  LOAD_AUTH,
  LOGIN_REQUEST,
  LOGIN,
  LOGOUT,
} from './types';

const defaultState = { loaded: false, user: null };

export default function authReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_AUTH:
      return { ...state, loaded: true, user: action.payload || null };

    case LOGIN_REQUEST:
      return { ...state, loggingIn: true };

    case LOGIN:
      if (action.error) {
        return { ...state, loggingIn: false, user: null, error: true };
      }
      return { ...state, loggingIn: false, user: action.payload || null, error: false };

    case LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
}
