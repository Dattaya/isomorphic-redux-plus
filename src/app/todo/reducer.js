import { Map } from 'immutable';

import {
  LOAD_TODOS,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from './types';

export default function todoReducer(state = Map(), action) {
  const { payload, meta } = action;

  switch (action.type) {
    case LOAD_TODOS:
      return Map(payload.map((todo) => [todo.id, Map(todo)]));

    case CREATE_TODO:
    case EDIT_TODO:
      return state.set(payload.id, Map(payload));

    case DELETE_TODO:
      return state.delete(meta.id);

    default:
      return state;
  }
}
