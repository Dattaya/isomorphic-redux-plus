import createRequest from './createRequest';
import injected from './injected';

export default (inject) => () => (next) => (action) => {
  const { type, meta } = action;

  if (!meta || !meta.inject || typeof action.payload !== 'function') {
    return next(action);
  }

  next({ type: `${type}_REQUEST`, meta });

  return Promise.resolve(action.payload(inject)).then(
    ({ data }) => next({ ...action, payload: data }),
    (payload) => next({ ...action, error: true, payload })
  );
};

export { createRequest, injected };
