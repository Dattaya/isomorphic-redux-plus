import { fromJS } from 'immutable';

import {
  LOAD_ABOUT,
  TOGGLE_KITTEN,
} from './types';

const defaultState = fromJS({
  text: '',
  showKitten: false,
});

export default function aboutReducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_ABOUT:
      return state.set('text', action.payload.text);
    case TOGGLE_KITTEN:
      return state.update('showKitten', (showKitten) => !showKitten);
    default:
      return state;
  }
}
