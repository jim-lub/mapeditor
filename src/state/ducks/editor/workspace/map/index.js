import { createReducer } from 'state/lib/utils';

import * as selectors from './selectors';

import { layerTypes } from 'lib/editor/map';

const initialState = {
  layerSortOrder: ['layer_1', 'layer_2', 'layer_3'],
  layerProperties: {
    'layer_1': {
      type: layerTypes.paintLayer,
      tileSetId: null,
      tileSize: [32, 32],
      visiblity: true,
      meta: {}
    },
    'layer_2': {
      type: layerTypes.tileLayer,
      tileSetId: 'tilesetId_1',
      tileSize: [32, 32],
      visiblity: true,
      meta: {}
    },
    'layer_3': {
      type: layerTypes.collisionLayer,
      tileSetId: null,
      tileSize: [32, 32],
      visiblity: true,
      meta: {}
    }
  },

  // segmentSortOrder[segmentColumn][segmentRow]
  segmentSortOrder: [ ['segment_1', 'segment_2'], ['segment_3', 'segment_4'] ],
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
  segmentCollection: {
    'segment_1': {
      'layer_1': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_2': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_3': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
    },
    'segment_2': {
      'layer_1': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_2': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_3': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
    },
    'segment_3': {
      'layer_1': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_2': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_3': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
    },
    'segment_4': {
      'layer_1': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_2': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
      'layer_3': [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
    }
  }
}

export default createReducer( initialState )({

});
