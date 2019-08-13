export const setProjectsCollection = (state, action) => {
  const { collection } = action.payload;

  return {
    ...state,
    collection: [...collection],
    initialized: true
  }
}

export const clearProjectsCollection = (state, action) => {
  return {
    ...state,
    collection: [],
    initialized: true
  }
}

export const setActiveProject = (state, action) => {
  const { projectId } = action.payload;

  return {
    ...state,
    active: projectId
  }
}