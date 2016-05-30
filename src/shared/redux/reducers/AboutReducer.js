const defaultState = '';

export default function aboutReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_ABOUT':
      return action.payload.text;
    default:
      return state;
  }
}

export const selectAbout = (state) => state.about;
