export const isLoaded = (state) => state.auth.loaded;

export const isAuthenticated = (state) => !!state.auth.user;
