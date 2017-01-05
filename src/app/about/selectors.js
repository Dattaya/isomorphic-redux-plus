import { createSelector } from 'reselect';

const getLocalState = (state) => state.about;

export const getAbout = createSelector(
  getLocalState,
  (about) => about.get('text'),
);

export const getShowKitten = createSelector(
  getLocalState,
  (about) => about.get('showKitten'),
);
