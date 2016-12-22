export default client => () => next => action => {
  const { promise, type, ...rest } = action;

  if (!promise) return next(action);

  const SUCCESS = type;

  const REQUEST = `${type}_REQUEST`;
  const FAILURE = `${type}_FAILURE`;

  next({ ...rest, type: REQUEST });

  return promise(client)
    .then(
      res => next({ ...rest, payload: res.data, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE })
    )
    .catch(error => {
      console.error(`Error in reducer that handles ${type}: `, error);
      next({ ...rest, error, type: FAILURE });
    });
};
