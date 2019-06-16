import { combineReducers } from 'redux';

import scene from './scene';
import tileset from './tileset';
import tools from './tools';

export default combineReducers ({
  scene,
  tileset,
  tools
})
