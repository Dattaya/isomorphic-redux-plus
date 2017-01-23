import { createAction } from 'redux-actions';
import { setStatus } from 'status/actions';

import {
  LOAD_ABOUT,
  TOGGLE_KITTEN,
} from './types';

export const loadAbout = () => ({ client, store }) => ({
  type: LOAD_ABOUT,
  payload: client.get('/about').catch((err) => {
    store.dispatch(setStatus(err.response.status));
  }),
});

export const toggleKitten = createAction(TOGGLE_KITTEN);
