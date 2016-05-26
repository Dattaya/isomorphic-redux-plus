import Immutable from 'immutable';

import { isAuthenticated } from './AuthReducer';

const defaultState = Immutable.Map();

export default function todoReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_TODOS':
      return Immutable.fromJS(action.payload);

    case 'LOAD_TODO':
      return state.set(action.payload.id, Immutable.Map(action.payload));

    case 'CREATE_TODO':
      return state.set(action.payload.id, Immutable.Map(action.payload));

    case 'EDIT_TODO':
      return state.set(action.payload.id, Immutable.Map(action.payload));

    case 'DELETE_TODO':
      return state.delete(action.id);

    default:
      return state;
  }
}

// Selectors:

export const isEditable = (state) => isAuthenticated(state);

export const selectTodo = (state, id) => state.todos.get(id);
