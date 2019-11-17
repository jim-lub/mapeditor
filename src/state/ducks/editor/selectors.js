import {
 getCurrentScene
} from 'state/ducks/editor/map';

import {

} from 'state/ducks/editor/tilemap';

import {
  // getActiveLayerId
  getActiveLayerProperties
} from 'state/ducks/editor/layers';

import {
  getCurrentTool
} from 'state/ducks/editor/tools';

import {
  getRequestStatus
} from 'state/ducks/editor/requestStatus';

// import * as moduleTypes from 'lib/constants/editorModuleTypes';
// import * as layerTypes from 'lib/constants/layerTypes';
// import layerConstants from 'lib/constants/layerConstants';
// import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

export const userInputActionsAllowedOnMap = state => {
  const layerProperties = getActiveLayerProperties(state);
  const currentTool = getCurrentTool(state);

  return (
    !disableAllEditorInput(state)
    && !!layerProperties
    && !!layerProperties.visible
    && !!currentTool
    && !!(toolConstants[currentTool].isAllowedOnLayers.includes(layerProperties.layerType))
    // && !(currentTool === toolTypes.tileStamp && )
  )
}

export const disableAllEditorInput = state => {
  if (!getCurrentScene(state).uid) return true;
  if (getRequestStatus(state, { key: 'initializeMap'}).loading) return true;
  if (getRequestStatus(state, { key: 'storeMap'}).loading) return true;
  if (getRequestStatus(state, { key: 'history'}).loading) return true;

  return false;
}
