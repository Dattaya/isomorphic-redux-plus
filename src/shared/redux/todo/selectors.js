import sortBy from 'lodash/sortBy';

import { isAuthenticated } from 'redux/auth/selectors';

export const isEditable = (state) => isAuthenticated(state);

export const getTodos = (state) => state.todo;

export const getTodo = (state, id) => getTodos(state)[id];

export const computeTodos = (state) => sortBy(getTodos(state), 'dateCreated');
