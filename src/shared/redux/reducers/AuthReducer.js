import Immutable from 'immutable';

const defaultState = Immutable.Map({ loaded: false, user: null });

export default function authReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case 'LOAD_AUTH':
      return state.merge({ loaded: true, user: action.payload || null });

    case 'LOGIN_REQUEST':
      return state.set('loggingIn', true);

    case 'LOGIN':
      return state.merge({ loggingIn: false, user: action.payload || null, error: false });

    case 'LOGIN_FAILURE':
      return state.merge({ loggingIn: false, user: null, error: true });

    case 'LOGOUT':
      return state.set('user', null);

    default:
      return state;
  }
}

// Selectors:

export const isLoaded = (state) => state.auth.get('loaded');

export const isAuthenticated = (state) => !!state.auth.get('user');
