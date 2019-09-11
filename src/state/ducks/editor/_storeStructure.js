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
