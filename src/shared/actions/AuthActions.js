export const loadAuth = () => ({
  type:    'LOAD_AUTH',
  promise: client => client.get('/loadAuth')
});

export const login = (login, pass) => ({
  type:    'LOGIN',
  promise: client => client.post('/login', {login, pass})
});

export const logout = () => ({
  type:    'LOGOUT',
  promise: client => client.post('/logout', {})
});
