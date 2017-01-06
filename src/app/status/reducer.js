import { LOCATION_CHANGE } from 'react-router-redux';
import { Map } from 'immutable';

import {
  SET_STATUS,
} from './types';

const defaultState = Map({ status: null, initialLoad: true });

const computeStatus = (status) => {
  if (!status) {
    return 0;
  }

  return String(status).startsWith('5') ? 503 : 404;
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_STATUS:
      return state.set('status', computeStatus(action.payload));
    case LOCATION_CHANGE:
      return state.get('initialLoad')
        ? state.set('initialLoad', false)
        : state.set('status', null);
    default:
      return action.role === 'primary' && action.error
        ? state.set('status', computeStatus(action.error.status))
        : state;
  }
};
