import values from 'lodash/values';

import { isAuthenticated } from 'redux/auth/authSelectors';

export const isEditable = (state) => isAuthenticated(state);

export const getTodos = (state) => values(state.todos);
