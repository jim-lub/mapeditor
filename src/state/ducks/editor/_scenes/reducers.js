export const fetchScenesBegin = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null
  }
};

export const fetchScenesSuccess = (state, action) => {
  const { scenes } = action.payload;

  return {
    ...state,
    loading: false,
    collection: scenes
  }
};

export const fetchScenesFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    loading: false,
    error,
    collection: []
  }
};

export const setActiveScene = (state, action) => {
  const { sceneId } = action.payload;

  return {
    ...state,
    active: sceneId
  }
};
