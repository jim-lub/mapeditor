export const setScenesCollection = (state, action) => {
  const { collection } = action.payload;

  return {
    ...state,
    collection: [...collection],
    initialized: true
  }
}

export const clearScenesCollection = (state, action) => {
  return {
    ...state,
    collection: [],
    initialized: true
  }
}

export const setActiveScene = (state, action) => {
  const { sceneId } = action.payload;

  return {
    ...state,
    active: sceneId
  }
}
