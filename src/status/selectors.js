const getLocalState = (state) => state.pageStatus;

export const getPageStatus = (state) => getLocalState(state).status;
