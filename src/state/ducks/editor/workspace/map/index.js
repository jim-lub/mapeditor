import { createReducer } from 'state/lib/utils';

import * as selectors from './selectors';

import { layerTypes } from 'lib/editor/map';

const initialState = {
  mapProperties: {
    mapSize: {
      columns: 50,
      rows: 50
    },
    segmentSize: {
      width: 512,
      height: 512
    },
    allowedTileSizes: [16, 32, 64, 128]
  },

  layerSortOrder: ['layer_1', 'layer_2'],
  layerProperties: {
    'layer_1': {
      type: layerTypes.paintLayer,
      tileSetId: null,
      tileSize: [32, 32],
      visiblity: true,
      meta: {}
    },
    'layer_2': {
      type: layerTypes.paintLayer,
      tileSetId: null,
      tileSize: [32, 32],
      visiblity: true,
      meta: {}
    },
  },

  // segmentSortOrder[segmentColumn][segmentRow]
  mapGrid: [ ['segment_1', 'segment_2'], ['segment_3', 'segment_4'] ],

  segmentProperties: {
    'segment_1': {
      modified: false,
      modifiedAt: null
    },
    'segment_2': {
      modified: false,
      modifiedAt: null
    },
    'segment_3': {
      modified: false,
      modifiedAt: null
    },
    'segment_4': {
      modified: false,
      modifiedAt: null
    }
  },

  tilemapData: {
    'segment_1': {
      'layer_1': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_2': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
    },
    'segment_2': {
      'layer_1': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_2': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
    },
    'segment_3': {
      'layer_1': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_2': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
    },
    'segment_4': {
      'layer_1': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_2': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
    }
  }
}

export default createReducer( initialState )({

});

/*** selectors ***/
export const getMapProperties = selectors.getMapProperties;
export const getMapSize = selectors.getMapSize;
export const getSegmentSize = selectors.getSegmentSize;
export const getAllowedTileSizes = selectors.getAllowedTileSizes;

export const getLayerSortOrder = selectors.getLayerSortOrder;
export const getLayerPropertiesObj = selectors.getLayerPropertiesObj;
export const getLayerPropertiesById = selectors.getLayerPropertiesById;

export const getSegmentIdFromGridByColumnAndRowIndex = selectors.getSegmentIdFromGridByColumnAndRowIndex;
export const getMapGrid = selectors.getMapGrid;
export const getSegmentPropertiesObj = selectors.getSegmentPropertiesObj;
export const getSegmentPropertiesById = selectors.getSegmentPropertiesById;

export const getTilemapDataBySegmentId = selectors.getTilemapDataBySegmentId;
