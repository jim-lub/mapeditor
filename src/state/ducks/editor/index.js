import { combineReducers } from 'redux';

import { default as projects } from './projects';
import { default as scenes } from './scenes';
import { default as map } from './map';

export default combineReducers({ projects, scenes, map });
