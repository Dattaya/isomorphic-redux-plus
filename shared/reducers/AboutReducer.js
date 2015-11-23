const defaultState = '';

export default function aboutReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GET_ABOUT':
      return action.res.data.text;
    default:
      return state;
  }
}
