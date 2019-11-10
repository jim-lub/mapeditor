import { combineReducers } from 'redux';

import { default as projects } from './projects';
import { default as scenes } from './scenes';

import { default as map } from './map';
import { default as layers } from './layers';
import { default as tilemap } from './tilemap';
import { default as tilesets } from './tilesets';
import { default as tools } from './tools';
import { default as requestStatus } from './requestStatus';

export default combineReducers({ projects,scenes, map, layers, tilemap, tilesets, tools, requestStatus });
