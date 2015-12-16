export const getAbout = () => ({
  type:    'GET_ABOUT',
  promise: client => client.get('/about')
});
