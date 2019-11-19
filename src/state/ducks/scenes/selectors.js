export const getSceneDataById = (state, sceneId) => state.scenes.collection[sceneId];
export const getSceneCollection = state => state.scenes.collection;
export const getActiveSceneId = state => state.scenes.active;
export const getSceneSortOrderByProjectId = (state, projectId) => state.scenes.sortOrder[projectId] || [];

export const getSetSceneCollectionStatus = state => state.scenes.status.setSceneCollection;
export const getCreateSceneStatus = state => state.scenes.status.createScene;
export const getDeleteSceneStatus = state => state.scenes.status.deleteScene;
export const getUpdateSceneStatus = state => state.scenes.status.updateScene;
