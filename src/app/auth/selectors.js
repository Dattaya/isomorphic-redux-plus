import { createSelector } from 'reselect';

const getLocalState = () => (state) => state.auth;

export const isLoaded = createSelector(
  getLocalState(),
  ({ loaded }) => loaded
);

export const isAuthenticated = createSelector(
  getLocalState(),
  ({ user }) => !!user,
);
