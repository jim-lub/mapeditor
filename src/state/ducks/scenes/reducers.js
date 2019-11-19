/*** SET SCENE COLLECTION ***/
export const setSceneCollectionRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      setSceneCollection: { loading: true, error: null }
    }
  }
};

export const setSceneCollectionSuccess = (state, action) => {
  const { sceneCollection, sceneSortOrder } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      setSceneCollection: { loading: false, error: null }
    },
    collection: sceneCollection,
    sortOrder: sceneSortOrder
  }
};

export const setSceneCollectionFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      setSceneCollection: { loading: false, error }
    },
  }
};

/*** CREATE SCENE ***/
export const createSceneRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      createScene: { loading: true, error: null }
    },
  }
};

export const createSceneSuccess = (state, action) => {
  const { sceneId } = action.payload;
  return {
    ...state,
    status: {
      ...state.status,
      createScene: { loading: false, error: null }
    },
    active: sceneId
  }
};

export const createSceneFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      createScene: { loading: true, error }
    }
  }
};

/*** DELETE SCENE ***/
export const deleteSceneRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      deleteScene: { loading: true, error: null }
    },
  }
};

export const deleteSceneSuccess = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      deleteScene: { loading: false, error: null }
    }
  }
};

export const deleteSceneFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      deleteScene: { loading: true, error }
    }
  }
};

/*** UPDATE SCENE ***/
export const updateSceneRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      updateScene: { loading: true, error: null }
    },
  }
};

export const updateSceneSuccess = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      updateScene: { loading: false, error: null }
    }
  }
};

export const updateSceneFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      updateScene: { loading: true, error }
    }
  }
};

/*** ***/
export const setActiveScene = (state, action) => {
  const { sceneId } = action.payload;

  return {
    ...state,
    active: sceneId
  }
}
