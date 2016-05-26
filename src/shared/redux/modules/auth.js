import Immutable from 'immutable';

export const loadAuth = () => ({
  type:    'LOAD_AUTH',
  promise: client => client.get('/loadAuth')
});

export const login = (login, pass) => ({
  type:    'LOGIN',
  promise: client => client.post('/login', {login, pass})
});

export const logout = () => ({
  type:    'LOGOUT',
  promise: client => client.post('/logout', {})
});

const defaultState = Immutable.Map({loaded: false, user: null});

export default function authReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case 'LOAD_AUTH':
      return state.merge({loaded: true, user: action.payload || null});

    case 'LOGIN_REQUEST':
      return state.set('loggingIn', true);

    case 'LOGIN':
      return state.merge({loggingIn: false, user: action.payload || null, error: false});

    case 'LOGIN_FAILURE':
      return state.merge({loggingIn: false, user: null, error: true});

    case 'LOGOUT':
      return state.set('user', null);

    default:
      return state;
  }
}

// Selectors:

export const isLoaded = (state) => state.auth.get('loaded');

export const isAuthenticated = (state) => !!state.auth.get('user');
