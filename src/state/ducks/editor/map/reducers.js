import { statusReducer } from 'state/lib/utils';

export const initializeMapRequest = (state, action) => {
  return {
    ...state,
    ...statusReducer('initializeMap', 'REQUEST', state)
  }
}

export const initializeMapSuccess = (state, action) => {
  return {
    ...state,
    ...statusReducer('initializeMap', 'SUCCESS', state)
  }
}

export const initializeMapFailure = (state, action) => {
  return {
    ...state,
    ...statusReducer('initializeMap', 'FAILURE', state, action.payload.error)
  }
}

export const storeMapRequest = (state, action) => {
  return {
    ...state,
    ...statusReducer('storeMap', 'REQUEST', state)
  }
}

export const storeMapSuccess = (state, action) => {
  return {
    ...state,
    ...statusReducer('storeMap', 'SUCCESS', state)
  }
}

export const storeMapFailure = (state, action) => {
  return {
    ...state,
    ...statusReducer('storeMap', 'FAILURE', state, action.payload.error)
  }
}

export const setMapProperties = (state, action) => {
  return {
    ...state,
    mapProperties: {
      ...action.payload.mapProperties
    }
  }
};

export const setMapGrid = (state, action) => {
  return {
    ...state,
    mapGrid: [
      ...action.payload.mapGrid
    ]
  }
};
