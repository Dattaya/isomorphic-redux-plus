import {
  LOAD_AUTH,
  LOGIN,
  LOGOUT,
}                from 'redux/auth/types';

export const loadAuth = () => ({
  type:    LOAD_AUTH,
  promise: client => client.get('/loadAuth'),
});

export const login = (name, pass) => ({
  type:    LOGIN,
  promise: client => client.post('/login', { name, pass }),
});

export const logout = () => ({
  type:    LOGOUT,
  promise: client => client.post('/logout', {}),
});
