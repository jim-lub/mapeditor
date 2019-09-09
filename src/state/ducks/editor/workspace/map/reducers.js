export const initializeMapRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      initializeMap: { loading: true, error: null }
    }
  }
}

export const initializeMapSuccess = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      initializeMap: { loading: false, error: null }
    }
  }
}

export const initializeMapFailure = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      initializeMap: { loading: false, error: action.payload.error }
    }
  }
}

export const saveMapRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      saveMap: { loading: true, error: null }
    }
  }
}

export const saveMapSuccess = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      saveMap: { loading: false, error: null }
    }
  }
}

export const saveMapFailure = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      saveMap: { loading: false, error: action.payload.error }
    }
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
