export const getProjectDataById = (state, projectId) => state.editor._projects.collection[projectId];
export const getProjectCollection = state => state.editor._projects.collection;
export const getProjectSortOrder = state => state.editor._projects.sortOrder;
export const getActiveProjectId = state => state.editor._projects.active;

export const getSetProjectCollectionStatus = state => state.editor._projects.status.setProjectCollection;
export const getCreateProjectStatus = state => state.editor._projects.status.createProject;
export const getDeleteProjectStatus = state => state.editor._projects.status.deleteProject;
export const getUpdateProjectStatus = state => state.editor._projects.status.updateProject;
