import * as types from './types';

export const setAuthUser = ({ authUser = null }) => {
  return {
    type: types.SET_AUTH_USER,
    payload: {
      authUser
    }
  }
}

export const clearAuthUser = () => {
  return {
    type: types.CLEAR_AUTH_USER
  }
}

export const setAuthError = ({ error = null }) => {
  return {
    type: types.SET_AUTH_ERROR,
    payload: {
      error
    }
  }
}

export const clearAuthError = () => {
  return {
    type: types.CLEAR_AUTH_ERROR
  }
}
