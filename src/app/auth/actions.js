import { LOAD_AUTH, LOGIN, LOGOUT } from './types';

export const loadAuth = () => ({ client }) => ({
  type: LOAD_AUTH,
  payload: client.get('/loadAuth'),
});

export const logout = () => ({ client }) => ({
  type: LOGOUT,
  payload: client.get('/logout'),
});

export const login = (payload) => ({ client }) => ({
  type: LOGIN,
  payload: client.post('/login', payload),
});
