import Immutable         from 'immutable';
import {LOCATION_CHANGE} from 'react-router-redux';


export const selectPageStatus = (state) => state.pageStatus.get('status');

const defaultState = Immutable.Map({ status: null, initialLoad: true });

const computeStatus = (status) => {
  if (!status) {
    return 0;
  }
  if (String(status).startsWith('5')) {
    return 503;
  }
  return 404;
};

export default (state = defaultState, action = {}) => {
  if (action.type === LOCATION_CHANGE) {
    if (state.get('initialLoad')) {
      return state.set('initialLoad', false)
    }
    return state.set('status', null)
  }
  if (action.role === 'primary' && action.error) {
    return state.set('status', computeStatus(action.error.status));
  }

  return state;
}
