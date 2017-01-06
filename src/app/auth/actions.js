import { createRequest } from 'lib/promiseMiddleware';
import { LOAD_AUTH, LOGIN, LOGOUT } from './types';

export const loadAuth = () => createRequest(LOAD_AUTH, {
  method: 'GET',
  url: '/loadAuth',
});

export const logout = () => createRequest(LOGOUT, {
  method: 'POST',
  url: '/logout',
});

export const login = (payload) => createRequest(LOGIN, {
  method: 'POST',
  url: '/login',
  data: payload,
});
