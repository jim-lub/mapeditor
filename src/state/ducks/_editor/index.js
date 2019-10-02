import { combineReducers } from 'redux';

import { default as map } from './map';
import { default as layers } from './layers';
import { default as tilemap } from './tilemap';
import { default as tools } from './tools';
import { default as requestStatus } from './requestStatus';

export default combineReducers({ map, layers, tilemap, tools, requestStatus });
