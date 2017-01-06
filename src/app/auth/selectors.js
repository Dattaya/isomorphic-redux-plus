import { createSelector } from 'reselect';

const getLocalState = (state) => state.get('auth');

export const isLoaded = createSelector(
  getLocalState,
  (auth) => auth.get('loaded'),
);

export const selectUser = createSelector(
  getLocalState,
  (auth) => auth.get('user'),
);

export const isAuthenticated = createSelector(
  selectUser,
  (user) => !!user,
);

export const selectLoggingIn = createSelector(
  getLocalState,
  (auth) => auth.get('loggingIn'),
);

export const selectError = createSelector(
  getLocalState,
  (auth) => auth.get('error'),
);
