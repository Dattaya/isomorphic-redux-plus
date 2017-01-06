import { Map } from 'immutable';

const applyRole = (map, role) => (role ? map.set('meta', { role }) : map);

export default (injected) => () => (next) => (action) => {
  const { promise, type, role } = action;

  if (!promise) {
    return next(action);
  }

  next({ type: `${type}_REQUEST` });

  return promise(injected).then(
    ({ data }) => next(
      applyRole(Map({ type }), role)
      .set('payload', data)
      .toJS()
    ), (error) => next(
      applyRole(Map({ type }), role)
      .set('payload', error)
      .set('error', true)
      .toJS()
    ));
};
