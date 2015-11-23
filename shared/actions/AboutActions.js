export function getAbout() {
  return {
    type:    'GET_ABOUT',
    promise: client => client.get('/about')
  }
}
