export const fetchProjectsBegin = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null
  }
};

export const fetchProjectsSuccess = (state, action) => {
  const { projects } = action.payload;

  return {
    ...state,
    loading: false,
    collection: projects
  }
};

export const fetchProjectsFailure = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    loading: false,
    error,
    collection: []
  }
};

export const setActiveProject = (state, action) => {
  const { projectId } = action.payload;

  return {
    ...state,
    active: projectId
  }
};

export const clearProjects = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    collection: []
  }
};
