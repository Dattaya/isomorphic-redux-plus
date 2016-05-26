const defaultState = '';

export default function aboutReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_ABOUT':
      return action.res.data.text;
    default:
      return state;
  }
}
