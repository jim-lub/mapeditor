import { combineReducers } from 'redux';

import { default as projects } from './projects';
import { default as scenes } from './scenes';
import { default as workspace } from './workspace';

export default combineReducers({ projects, scenes, workspace });
