import { combineReducers } from 'redux';

import { default as projects } from './projects';
import { default as scenes } from './scenes';

export default combineReducers({ projects, scenes });
