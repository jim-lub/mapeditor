import {
 getCurrentScene
} from 'state/ducks/editor/map';

import {

} from 'state/ducks/editor/tilemap';

import {
 // getActiveLayerId
} from 'state/ducks/editor/layers';

import {
 // getCurrentTool
} from 'state/ducks/editor/tools';

import {
  getRequestStatus
} from 'state/ducks/editor/requestStatus';

export const userInputActionsAllowedOnMap = state => {
  return true;
}

export const disableAllEditorInput = state => {
  if (!getCurrentScene(state).uid) return true;
  if (getRequestStatus(state, { key: 'initializeMap'}).loading) return true;
  if (getRequestStatus(state, { key: 'storeMap'}).loading) return true;
  if (getRequestStatus(state, { key: 'history'}).loading) return true;

  return false;
}
