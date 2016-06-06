import values from 'lodash/values';

import { isAuthenticated } from 'redux/auth/authSelectors';

export const isEditable = (state) => isAuthenticated(state);

export const selectTodos = (state) => values(state.todos);

export const selectTodo = (state, id) => state.todos[id];
