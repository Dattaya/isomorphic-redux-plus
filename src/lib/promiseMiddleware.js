export default (injected) => () => (next) => ({ promise, type }) => {
  if (!promise) {
    return next(action);
  }

  next({ type: `${type}_REQUEST` });

  return promise(injected).then(
    ({ data }) => next({ payload: data, type }),
    (error) => next({ error: true, payload: error, type })
  )
};
