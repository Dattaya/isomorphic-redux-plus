import {
  LOAD_ABOUT,
  TOGGLE_KITTEN,
} from './types';

export const loadAbout = () => ({
  type: LOAD_ABOUT,
  role: 'primary',
  promise: ({ client }) => client.get('/about'),
});

export const toggleKitten = () => ({
  type: TOGGLE_KITTEN,
});
