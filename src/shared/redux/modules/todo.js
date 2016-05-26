import Immutable from 'immutable';

import { isAuthenticated } from './auth';

export const loadTodos = () => ({
  type:    'LOAD_TODOS',
  promise: client => client.get('/todos')
});

export const loadTodo = (id) => ({
  type:    'LOAD_TODO',
  role:    'primary',
  promise: client => client.get('/todos/' + id)
});

export const createTodo = (text) => ({
  type:    'CREATE_TODO',
  promise: client => client.post('/todos', {text, dateUpdated: Date.now()})
});

export const editTodo = (id, text) => ({
  type:    'EDIT_TODO',
  promise: client => client.put('/todos/' + id, {text, id, dateUpdated: Date.now()})
});

export const deleteTodo = (id) => ({
  type:    'DELETE_TODO',
  promise: client => client.delete('/todos/' + id),
           id
});

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
