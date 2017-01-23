import { createSelector } from 'reselect';
import { isAuthenticated } from 'auth/selectors';

export const isEditable = isAuthenticated;

const getTodos = (state) => state.get('todo');

export const getTodo = (id) => createSelector(
  getTodos,
  (todos) => todos.get(id)
);

export const todosByDate = createSelector(
  getTodos,
  (todos) => todos.toList().sortBy((todo) => todo.dateCreated).toJS(),
);
