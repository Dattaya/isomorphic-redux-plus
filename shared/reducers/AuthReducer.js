import Immutable from 'immutable';

const defaultState = Immutable.Map({loaded: false});

export default function authReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case 'LOAD':
      return state.merge({loaded: true, user: action.res.data});

    case 'LOGIN_REQUEST':
      return state.set('loggingIn', true);

    case 'LOGIN':
      return state.merge({loggingIn: false, user: action.res.data, errorMessage: null});

    case 'LOGIN_FAILURE':
      return state.merge({loggingIn: false, user: null, errorMessage: action.errorMessage});

    case 'LOGOUT':
      return state.set('user', null);

    default:
      return state;
  }
}
