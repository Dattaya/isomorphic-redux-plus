export const loadAbout = () => ({
  type:    'LOAD_ABOUT',
  promise: client => client.get('/about')
});
