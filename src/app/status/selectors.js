import { createSelector } from 'reselect';

const getLocalState = (state) => state.get('pageStatus');

export const getPageStatus = createSelector(
  getLocalState,
  (pageStatus) => pageStatus.get('status'),
);
