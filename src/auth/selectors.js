const getLocalState = (state) => state.auth;

export const isLoaded = (state) => getLocalState(state).loaded;

export const isAuthenticated = (state) => !!getLocalState(state).user;
