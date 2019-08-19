export const getProjects = state => state.editor.projects.collection;
export const getProjectIds = state => state.editor.projects.collection.map(data => data.uid);
export const getProjectById = (state, uid) => state.editor.projects.collection.filter(data => data.uid === uid);
export const getProjectFetchStatus = state => ({ loading: state.editor.projects.loading, error: state.editor.projects.error });
export const getActiveProjectId = state => state.editor.projects.active;
