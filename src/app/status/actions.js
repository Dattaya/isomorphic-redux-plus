import {
  SET_STATUS,
} from './types';

export const setStatus = (status) => ({
  type: SET_STATUS,
  payload: status,
});
