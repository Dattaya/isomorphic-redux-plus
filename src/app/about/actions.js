import { createRequest } from 'lib/promiseMiddleware';
import {
  LOAD_ABOUT,
  TOGGLE_KITTEN,
} from './types';

export const loadAbout = () => createRequest(LOAD_ABOUT, {
  method: 'GET',
  url: '/about',
}, { role: 'primary' });

export const toggleKitten = () => ({
  type: TOGGLE_KITTEN,
});
