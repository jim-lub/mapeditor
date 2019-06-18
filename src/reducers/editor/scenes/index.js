import * as reducer from './reducers';
import * as selector from './selectors';

const defaultState = {

}

export default (state = defaultState, action) => {
  switch (action.type) {

    /** @ MAP **/
    case 'EDITOR_SET_MAP_SIZE':
      return reducer.setMapSize(state, action);
    case 'EDITOR_SET_SEGMENT_SIZE':
      return reducer.setSegmentSize(state, action);
    case 'EDITOR_SET_ALLOWED_TILE_SIZES':
      return reducer.setAllowedTileSizes(state, action);

    /** @ LAYERS **/
    case 'EDITOR_ADD_LAYER':
      return reducer.addLayer(state, action);
    case 'EDITOR_DELETE_LAYER':
      return reducer.deleteLayer(state, action);
    case 'EDITOR_UPDATE_LAYER_SORT_ORDER':
      return reducer.updateLayerSortOrder(state, action);
    case 'EDITOR_SET_ACTIVE_LAYER':
      return reducer.setActiveLayer(state, action);
    case 'EDITOR_SET_LAYER_LOCK':
      return reducer.setLayerLock(state, action);
    case 'EDITOR_SET_LAYER_VISIBILITY':
      return reducer.setLayerVisiblity(state, action);
    case 'EDITOR_SET_LAYER_COLOR':
      return reducer.setLayerColor(state, action);

    /** @ FOLDERS **/
    case 'EDITOR_ADD_FOLDER':
      return reducer.addFolder(state, action);
    case 'EDITOR_DELETE_FOLDER':
      return reducer.deleteFolder(state, action);
    case 'EDITOR_UPDATE_FOLDER_SORT_ORDER':
      return reducer.updateFolderSortOrder(state, action);
    case 'EDITOR_SET_FOLDER_LOCK':
      return reducer.setFolderLock(state, action);
    case 'EDITOR_SET_FOLDER_VISIBILITY':
      return reducer.setFolderVisiblity(state, action);
    case 'EDITOR_SET_FOLDER_COLOR':
      return reducer.setFolderColor(state, action);

    default:
      return state;
  }
}
