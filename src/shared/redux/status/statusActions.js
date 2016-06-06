import {
  SET_STATUS,
}             from 'redux/status/statusTypes';

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});
