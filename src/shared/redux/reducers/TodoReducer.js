import keyBy               from 'lodash/keyBy';
import omit                from 'lodash/omit';
import values              from 'lodash/values';
import update              from 'react-addons-update';
import { isAuthenticated } from './AuthReducer';

const defaultState = {};

export default function todoReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_TODOS':
      return keyBy(action.payload, 'id');

    case 'CREATE_TODO':
      return update(state, {
        [action.payload.id]: {
          $set: action.payload,
        },
      });

    case 'EDIT_TODO':
      return update(state, {
        [action.payload.id]: {
          $set: action.payload,
        },
      });

    case 'DELETE_TODO':
      return omit(state, action.id);

    default:
      return state;
  }
}

// Selectors:

export const isEditable = (state) => isAuthenticated(state);

export const selectTodos = (state) => values(state.todos);

export const selectTodo = (state, id) => state.todos[id];
