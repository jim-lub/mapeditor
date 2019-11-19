export const getProjectDataById = (state, projectId) => state.projects.collection[projectId];
export const getProjectCollection = state => state.projects.collection;
export const getProjectSortOrder = state => state.projects.sortOrder;
export const getActiveProjectId = state => state.projects.active;

export const getSetProjectCollectionStatus = state => state.projects.status.setProjectCollection;
export const getCreateProjectStatus = state => state.projects.status.createProject;
export const getDeleteProjectStatus = state => state.projects.status.deleteProject;
export const getUpdateProjectStatus = state => state.projects.status.updateProject;
