export const getSceneDataById = (state, sceneId) => state.editor.scenes.collection[sceneId];
export const getSceneCollection = state => state.editor.scenes.collection;
export const getSceneSortOrder = state => state.editor.scenes.sortOrder;
export const getActiveSceneId = state => state.editor.scenes.active;

export const getSetSceneCollectionStatus = state => state.editor.scenes.status.setSceneCollection;
export const getCreateSceneStatus = state => state.editor.scenes.status.createScene;
export const getDeleteSceneStatus = state => state.editor.scenes.status.deleteScene;
export const getUpdateSceneStatus = state => state.editor.scenes.status.updateScene;
