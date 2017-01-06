export default (injected) => () => (next) => (action) => {
  const { promise, type } = action;

  if (!promise) {
    return next(action);
  }

  next({ type: `${type}_REQUEST` });

  return promise(injected).then(
    ({ data }) => next({
      type,
      payload: data,
      meta: { primary: action.primary },
    }), (error) => next({
      type,
      payload: error,
      error: true,
      meta: { primary: action.primary },
    })
  );
};
