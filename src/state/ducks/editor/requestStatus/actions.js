import * as types from './types';

export const setRequestStatus = ({ key, type, error = null }) => ({
  type: types.setRequestStatus,
  payload: { key, type, error }
});

export const clearRequestStatus = ({ key }) => ({
  type: types.clearRequestStatus,
  payload: { key }
});
