import { createSelector } from 'reselect';

const getLocalState = (state) => state.pageStatus;

export const getPageStatus = createSelector(
  getLocalState,
  (pageStatus) => pageStatus.get('status'),
);
