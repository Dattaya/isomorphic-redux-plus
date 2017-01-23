const injectMiddleware = (deps) => (store) => (next) => (action) =>
  next(typeof action === 'function'
    ? action({ ...deps, store })
    : action
  );

export default injectMiddleware;
