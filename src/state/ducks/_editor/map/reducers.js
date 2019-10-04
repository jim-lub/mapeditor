export const setCurrentScene = (state, action) => {
  const { uid } = action.payload;

  return {
    ...state,
    currentScene: {
      uid,
      initialized: false,
      modified: false
    }
  }
}

export const clearCurrentScene = (state, action) => {
  return {
    ...state,
    currentScene: {
      uid: null,
      initialized: false,
      modified: false
    }
  }
}

export const setMapProperties = (state, action) => {
  const { mapProperties } = action.payload;

  return {
    ...state,
    mapProperties: {
      ...mapProperties
    }
  }
}

export const clearMapProperties = (state, action) => {
  return {
    ...state,
    mapProperties: {}
  }
}

export const setMapGrid = (state, action) => {
  const { mapGrid } = action.payload;

  return {
    ...state,
    mapGrid: [
      ...mapGrid
    ]
  }
}

export const clearMapGrid = (state, action) => {
  return {
    ...state,
    mapGrid: []
  }
}
