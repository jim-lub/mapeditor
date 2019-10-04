import { deleteKeyValuePairFromObject } from 'state/lib/utils/deleteKeyValuePairFromObject';

export const setRequestStatus = (state, action) => {
  const { key, type, error } = action.payload;
  let stateObj;

  if (type === 'REQUEST') {
    stateObj = {
      initialized: false,
      loading: true,
      error: null
    }
  }

  if (type === 'SUCCESS') {
    stateObj = {
      initialized: true,
      loading: false,
      error: null
    }
  }

  if (type === 'FAILURE') {
    stateObj = {
      initialized: true,
      loading: false,
      error
    }
  }

  if (!key || !type) return state;

  return {
    ...state,
    status: {
      ...state.status,
      [key]: {
        ...stateObj
      }
    }
  }
}

export const clearRequestStatus = (state, action) => {
  const { key } = action.payload;

  if (!key) return state;

  return {
    ...state,
    status: {
      ...deleteKeyValuePairFromObject(
        state.status,
        key
      )
    }
  }
}
