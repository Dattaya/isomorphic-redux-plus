import Immutable           from 'immutable';
import { UPDATE_LOCATION } from 'react-router-redux'

import { isAuthenticated } from './AuthReducer';

const defaultState = Immutable.Map();

export default function todoReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      console.log('react-router-redux is working! Here\'s a location object for you: ', action.payload);
      return state;

    case 'LOAD_TODOS':
      return Immutable.fromJS(action.res.data);

    case 'LOAD_TODO':
      return state.set(action.res.data.id, Immutable.Map(action.res.data));

    case 'CREATE_TODO':
      return state.set(action.res.data.id, Immutable.Map(action.res.data));

    case 'EDIT_TODO':
      return state.set(action.res.data.id, Immutable.Map(action.res.data));

    case 'DELETE_TODO':
      return state.delete(action.id);

    default:
      return state;
  }
}

// Selectors:

export const isEditable = (state) => isAuthenticated(state);

export const selectTodo = (state, id) => state.todos.get(id);
