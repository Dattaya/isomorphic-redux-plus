export default client => store => next => action => {
  const { promise, type, ...rest } = action;

  if (!promise) return next(action);

  const SUCCESS = type;

  const REQUEST = type + '_REQUEST';
  const FAILURE = type + '_FAILURE';

  next({...rest, type: REQUEST});

  return promise(client)
    .then(res => {
      next({...rest, res, type: SUCCESS});

      return true;
    })
    .catch(error => {
      next({...rest, error, type: FAILURE});

      if (action.role === 'primary') {
        throw {status: error.status};
      }

      return false;
    });
};
