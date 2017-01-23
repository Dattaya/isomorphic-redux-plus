import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOAD_TODOS,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from './types';

export default handleActions({
  [LOAD_TODOS]: (state, { payload }) =>
    Map(payload.map((todo) => [todo.id, Map(todo)])),

  [CREATE_TODO]: (state, { payload }) =>
    state.set(payload.id, Map(payload)),

  [EDIT_TODO]: (state, { payload }) =>
    state.set(payload.id, Map(payload)),

  [DELETE_TODO]: (state, { meta }) =>
    state.delete(meta.id),
}, Map());
