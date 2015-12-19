import Immutable from 'immutable';

const defaultState = Immutable.Map();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    case 'LOAD_TODOS':
      return Immutable.fromJS(action.res.data);

    case 'CREATE_TODO':
      return state.set(action.res.data.id, Immutable.Map(action.res.data));

    case 'EDIT_TODO':
      return state.set(action.res.data.id, Immutable.Map(action.res.data));

    case 'DELETE_TODO':
      return state.delete(action.id);

    default:
      return state;
  }
}
