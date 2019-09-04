import { combineReducers } from 'redux';

import { default as map } from './map';
import { default as tools } from './tools';

export default combineReducers({ map, tools });
