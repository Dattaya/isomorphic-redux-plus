import {
  SET_STATUS,
}             from 'redux/status/types';

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});
