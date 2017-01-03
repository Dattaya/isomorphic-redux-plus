export default (injected) => () => (next) => (action) => {
  const { promise, type } = action;

  if (!promise) {
    return next(action);
  }

  next({ type: `${type}_REQUEST` });

  return promise(injected).then(
    ({ data }) => next({ payload: data, type }),
    (error) => next({ error: true, payload: error, type })
  );
};
