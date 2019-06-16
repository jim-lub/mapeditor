import { combineReducers } from 'redux';

import project from './project';
import scene from './scene';
import tileset from './tileset';
import tools from './tools';

export default combineReducers ({
  project,
  scene,
  tileset,
  tools
})
