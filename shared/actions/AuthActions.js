export function load() {
  return {
    type:    'LOAD',
    promise: client => client.get('/loadAuth')
  };
}

export function login(login, pass) {
  return {
    type:    'LOGIN',
    promise: client => client.post('/login', {login, pass})
  };
}

export function logout() {
  return {
    type:    'LOGOUT',
    promise: client => client.post('/logout', {})
  };
}
