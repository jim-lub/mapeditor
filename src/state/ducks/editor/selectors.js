import {
 getCurrentScene
} from 'state/ducks/editor/map';

import {
  // getActiveLayerId
  getActiveLayerProperties
} from 'state/ducks/editor/layers';

import {
  getCurrentTool
} from 'state/ducks/editor/tools';

import {
  getPattern
} from 'state/ducks/editor/user-input';

import {
  getRequestStatus
} from 'state/ducks/editor/requestStatus';

import toolConstants from 'lib/constants/toolConstants';

export const userInputActionsAllowedOnMap = state => {
  const layerProperties = getActiveLayerProperties(state);
  const currentTool = getCurrentTool(state);
  const pattern = getPattern(state);

  return (
    !disableAllEditorInput(state)
    && !!layerProperties
    && !!layerProperties.visible
    && !!currentTool
    && !!(toolConstants[currentTool].isAllowedOnLayers.includes(layerProperties.layerType))
    && !!(pattern.list.length > 0)
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
