import { combineReducers } from 'redux';

import projects from './projects';
import scenes from './scenes';
import tileset from './tileset';
import tools from './tools';
import workspace from './workspace';

export default combineReducers ({
  projects,
  scenes,
  tileset,
  tools,
  workspace
});
