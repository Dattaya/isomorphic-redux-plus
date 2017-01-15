import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOAD_ABOUT,
  TOGGLE_KITTEN,
} from './types';

const defaultState = fromJS({
  text: '',
  showKitten: false,
});

export default handleActions({
  [LOAD_ABOUT]: (state, { payload }) =>
    state.set('text', payload.text),

  [TOGGLE_KITTEN]: (state) =>
    state.update('showKitten', (showKitten) => !showKitten),
}, defaultState);
