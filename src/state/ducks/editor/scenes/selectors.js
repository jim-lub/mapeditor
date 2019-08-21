export const getScenes = state => state.editor.scenes.collection;
export const getSceneIds = state => state.editor.scenes.collection.map(data => data.uid);
export const getSceneById = (state, uid) => state.editor.scenes.collection.filter(data => data.uid === uid);
export const getSceneFetchStatus = state => ({ loading: state.editor.scenes.loading, error: state.editor.scenes.error });
export const getActiveSceneId = state => state.editor.scenes.active;
