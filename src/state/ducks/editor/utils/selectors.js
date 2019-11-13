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

export const isAllEditorInputDisabled = state => (
  !getCurrentScene(state).uid ||
  !!getRequestStatus(state, { key: 'initializeMap'}).loading ||
  !!getRequestStatus(state, { key: 'storeMap'}).loading ||
  !!getRequestStatus(state, { key: 'history'}).loading
);
