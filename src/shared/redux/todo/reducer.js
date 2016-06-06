import keyBy               from 'lodash/keyBy';
import omit                from 'lodash/omit';
import update              from 'react-addons-update';

import {
  LOAD_TODOS,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
}              from 'redux/todo/types';

const defaultState = {};

export default function todoReducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_TODOS:
      return keyBy(action.payload, 'id');

    case CREATE_TODO:
      return update(state, {
        [action.payload.id]: {
          $set: action.payload,
        },
      });

    case EDIT_TODO:
      return update(state, {
        [action.payload.id]: {
          $set: action.payload,
        },
      });

    case DELETE_TODO:
      return omit(state, action.id);

    default:
      return state;
  }
}
