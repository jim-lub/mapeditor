import { combineReducers } from 'redux';

import { default as projects } from './projects';
import { default as scenes } from './scenes';

import { default as history } from './history';
import { default as layers } from './layers';
import { default as map } from './map';
import { default as requestStatus } from './requestStatus';
import { default as segments } from './segments';
import { default as tilemap } from './tilemap';
import { default as tilesets } from './tilesets';
import { default as tools } from './tools';
import { default as userInput } from './user-input';

import * as selectors from './selectors';

export default combineReducers({
  projects,
  scenes,
  history,
  layers,
  requestStatus,
  map,
  segments,
  tilemap,
  tilesets,
  tools,
  userInput
});

export const userInputActionsAllowedOnMap = selectors.userInputActionsAllowedOnMap;
export const disableAllEditorInput = selectors.disableAllEditorInput;
