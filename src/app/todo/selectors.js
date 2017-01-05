import sortBy from 'lodash/sortBy';
import { createSelector } from 'reselect';

import { isAuthenticated } from 'auth/selectors';

export const isEditable = isAuthenticated;

export const getTodos = (state) => state.todo;

export const getTodo = (id) => createSelector(
  getTodos,
  (todos) => todos[id]
);

export const computeTodos = createSelector(
  getTodos,
  (todos) => sortBy(todos, 'dateCreated'),
);
