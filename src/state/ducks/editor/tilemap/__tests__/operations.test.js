import { configureTestStore } from 'state/store';

import * as operations from '../operations';
import * as selectors from '../selectors';

describe('tilemap/operations', () => {
  describe('validate tilemapDataSegment', () => {

    it('should validate the tilemapDataSegment without changes', () => {
      const initialState = {
        editor: {
          layers: {
            activeLayerId: null,
            layerProperties: {
              'layer-1': {
                tileSize: { width: 256, height: 256 }
              }
            },
            layerSortOrder: ['layer-1']
          },
          tilemap: {
            tilemapDataObject: {
              'segment-1': {
                'layer-1': [[0, 0], [0, 0]]
              }
            }
          }
        }
      }

      const { dispatch, getState } = configureTestStore(initialState);

      dispatch( operations.validateTilemapDataSegment({ segmentId: 'segment-1' }) );

      const newState = getState();
      const tilemapDataSegment = selectors.getTilemapDataSegmentById(newState, { segmentId: 'segment-1'});

      expect(tilemapDataSegment).toEqual({
        'layer-1': [[0, 0], [0, 0]]
      });
    });

    it('should add a layer to the tilemapDataSegment', () => {
      const initialState = {
        editor: {
          map: {
            mapProperties: {
              segmentSize: { width: 512, height: 512 }
            }
          },
          layers: {
            activeLayerId: null,
            layerProperties: {
              'layer-1': {
                tileSize: { width: 256, height: 256 }
              },
              'layer-2': {
                tileSize: { width: 256, height: 256 }
              }
            },
            layerSortOrder: ['layer-1', 'layer-2']
          },
          tilemap: {
            tilemapDataObject: {
              'segment-1': {
                'layer-1': [[0, 0], [0, 0]]
              }
            }
          }
        }
      }

      const { dispatch, getState } = configureTestStore(initialState);

      dispatch( operations.validateTilemapDataSegment({ segmentId: 'segment-1' }) )
        .then(() => {
          const newState = getState();
          const tilemapDataSegment = selectors.getTilemapDataSegmentById(newState, { segmentId: 'segment-1'});

          expect(tilemapDataSegment).toEqual({
            'layer-1': [[0, 0], [0, 0]],
            'layer-2': [[0, 0], [0, 0]],
          });
        })
        .catch(e => console.log(e));
    });

    it('should remove a layer from the tilemapDataSegment', () => {
      const initialState = {
        editor: {
          layers: {
            activeLayerId: null,
            layerProperties: {
              'layer-1': {
                tileSize: { width: 256, height: 256 }
              }
            },
            layerSortOrder: ['layer-1']
          },
          tilemap: {
            tilemapDataObject: {
              'segment-1': {
                'layer-1': [[0, 0], [0, 0]],
                'layer-2': [[0, 0], [0, 0]]
              }
            }
          }
        }
      }

      const { dispatch, getState } = configureTestStore(initialState);

      dispatch( operations.validateTilemapDataSegment({ segmentId: 'segment-1' }) )
        .then(() => {
          const newState = getState();
          const tilemapDataSegment = selectors.getTilemapDataSegmentById(newState, { segmentId: 'segment-1'});

          expect(tilemapDataSegment).toEqual({
            'layer-1': [[0, 0], [0, 0]]
          });
        })
        .catch(e => console.log(e));
    });

  });
});

describe('tilemap/operations', () => {
  describe('handle user input', () => {

    it('should return early ( reason: no sceneId )', () => {
      // expect
    });

    it('should return early ( reason: layer not visible )', () => {
      // expect
    });

    it('should return early ( reason: no tool selected )', () => {
      // expect
    });

    it('should return early ( reason: tool not allowed on active layer )', () => {
      // expect
    });

    it('should dispatch `userInputHandlers.paintBrush`', () => {
      // expect
    });

    it('should dispatch `userInputHandlers.tileStamp`', () => {
      // expect
    });

    it('should dispatch `userInputHandlers.eraser`', () => {
      // expect
    });

    it('should dispatch `userInputHandlers.eyeDropper`', () => {
      // expect
    });

  });
});
