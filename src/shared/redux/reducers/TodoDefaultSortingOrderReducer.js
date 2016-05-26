import Immutable from 'immutable';

const defaultState = Immutable.List();

export default function todoDefaultSortingOrderReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_TODOS':
      return Immutable.List(Object.keys(action.payload));

    case 'CREATE_TODO':
      return state.push(action.payload.id);

    case 'DELETE_TODO':
      return state.delete(state.indexOf(action.id));

    default:
      return state;
  }
}
