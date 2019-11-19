/*** SET PROJECT COLLECTION ***/
export const setProjectCollectionRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      setProjectCollection: { loading: true, error: null }
    }
  }
};

export const setProjectCollectionSuccess = (state, action) => {
  const { projectCollection } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      setProjectCollection: { loading: false, error: null }
    },
    sortOrder: projectCollection.map(data => data.uid),
    collection: Object.assign({}, ...projectCollection.map(data => ({
      [data.uid]: {
        name: data.name,
        description: data.description
      }
    })))
  }
};

export const setProjectCollectionFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      setProjectCollection: { loading: false, error }
    },
  }
};

/*** CREATE PROJECT ***/
export const createProjectRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      createProject: { loading: true, error: null }
    },
  }
};

export const createProjectSuccess = (state, action) => {
  const { projectId } = action.payload;
  return {
    ...state,
    status: {
      ...state.status,
      createProject: { loading: false, error: null }
    },
    active: projectId
  }
};

export const createProjectFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      createProject: { loading: true, error }
    }
  }
};

/*** DELETE PROJECT ***/
export const deleteProjectRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      deleteProject: { loading: true, error: null }
    },
  }
};

export const deleteProjectSuccess = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      deleteProject: { loading: false, error: null }
    }
  }
};

export const deleteProjectFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      deleteProject: { loading: true, error }
    }
  }
};

/*** UPDATE PROJECT ***/
export const updateProjectRequest = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      updateProject: { loading: true, error: null }
    },
  }
};

export const updateProjectSuccess = (state, action) => {
  return {
    ...state,
    status: {
      ...state.status,
      updateProject: { loading: false, error: null }
    }
  }
};

export const updateProjectFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    status: {
      ...state.status,
      updateProject: { loading: true, error }
    }
  }
};

/*** ***/
export const setActiveProject = (state, action) => {
  const { projectId } = action.payload;

  return {
    ...state,
    active: projectId
  }
}
