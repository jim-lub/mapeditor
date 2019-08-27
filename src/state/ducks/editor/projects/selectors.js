export const getProjectDataById = (state, projectId) => state.editor.projects.collection[projectId];
export const getProjectCollection = state => state.editor.projects.collection;
export const getProjectSortOrder = state => state.editor.projects.sortOrder;
export const getActiveProjectId = state => state.editor.projects.active;

export const getSetProjectCollectionStatus = state => state.editor.projects.status.setProjectCollection;
export const getCreateProjectStatus = state => state.editor.projects.status.createProject;
export const getDeleteProjectStatus = state => state.editor.projects.status.deleteProject;
export const getUpdateProjectStatus = state => state.editor.projects.status.updateProject;
