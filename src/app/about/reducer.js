import { fromJS } from 'immutable';

import {
  LOAD_ABOUT,
} from './types';

const defaultState = fromJS({
  text: '',
});

export default function aboutReducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_ABOUT:
      return state.set('text', action.payload.text);
    default:
      return state;
  }
}
