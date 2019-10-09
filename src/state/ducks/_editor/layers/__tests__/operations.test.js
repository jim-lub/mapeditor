import configureStore from 'state/store';

import * as operations from '../operations';
import * as layerTypes from 'lib/constants/layerTypes';

describe('layer/operations', () => {
  it('should create a new layer', () => {
    const initialState = {
      _editor: {
        layers: {
          activeLayerId: null,
          layerProperties: {},
          layerSortOrder: []
        }
      }
    }

    const { dispatch, getState } = configureStore(initialState);

    dispatch( operations.createLayer({
          layerType: layerTypes.color,
          layerName: "layer-one",
          tileSize: { width: 32, height: 32 }
        }) );

    const newState = getState()._editor.layers;
    const layerSortOrderLength = newState.layerSortOrder.length;
    const layerPropertiesEntries = Object.keys(newState.layerProperties).length;
    const layerPropertiesById = Object.values(newState.layerProperties)[0];

    expect(layerSortOrderLength).toBe(1);
    expect(layerPropertiesEntries).toBe(1);
    expect(layerPropertiesById).toEqual({
      layerType: layerTypes.color,
      layerName: 'layer-one',
      tileSize: { width: 32, height: 32 },
      visible: true,
      locked: false
    });
  });
});

describe('layer/operations', () => {
  it('should delete the layer with uid `uid-for-layer-one`', () => {
    const initialState = {
      _editor: {
        layers: {
          activeLayerId: null,
          layerProperties: {
            'uid-for-layer-one': {
              layerType: layerTypes.color,
              layerName: "layer-one",
              tileSize: { width: 32, height: 32 },
              visible: true,
              locked: false
            }
          },
          layerSortOrder: ['uid-for-layer-one']
        }
      }
    }

    const { dispatch, getState } = configureStore(initialState);

    dispatch( operations.deleteLayer({
      layerId: 'uid-for-layer-one'
    }) );

    const newState = getState()._editor.layers;
    const layerSortOrderLength = newState.layerSortOrder.length;
    const layerPropertiesEntries = Object.keys(newState.layerProperties).length;

    expect(layerSortOrderLength).toBe(0);
    expect(layerPropertiesEntries).toBe(0);
  });
});

describe('layer/operations', () => {
  it('should update the name of a layer', () => {
    const initialState = {
      _editor: {
        layers: {
          activeLayerId: null,
          layerProperties: {
            'uid-for-layer-one': {
              layerType: layerTypes.color,
              layerName: "layer-one",
              tileSize: { width: 32, height: 32 },
              visible: true,
              locked: false
            }
          },
          layerSortOrder: ['uid-for-layer-one']
        }
      }
    }

    const { dispatch, getState } = configureStore(initialState);

    dispatch( operations.updateLayer({
      layerId: 'uid-for-layer-one',
      layerName: 'layer-one-2'
    }) );

    const newState = getState()._editor.layers;
    const layerPropertiesById = newState.layerProperties['uid-for-layer-one'];

    expect(layerPropertiesById).toEqual({
      layerType: layerTypes.color,
      layerName: 'layer-one-2',
      tileSize: { width: 32, height: 32 },
      visible: true,
      locked: false
    });
  });
});

describe('layer/operations', () => {
  const initialState = {
    _editor: {
      layers: {
        activeLayerId: null,
        layerProperties: {},
        layerSortOrder: ['uid-for-layer-1', 'uid-for-layer-2', 'uid-for-layer-3', 'uid-for-layer-4']
      }
    }
  }

  it('should move a layer #1', () => {
    const { dispatch, getState } = configureStore(initialState);

    dispatch( operations.moveLayer({
      sourceIndex: 0,
      destinationIndex: 2
    }) );

    const layerSortOrder = getState()._editor.layers.layerSortOrder;

    expect(layerSortOrder).toEqual(['uid-for-layer-2', 'uid-for-layer-3', 'uid-for-layer-1', 'uid-for-layer-4']);
  });

  it('should move a layer #2', () => {
    const { dispatch, getState } = configureStore(initialState);

    dispatch( operations.moveLayer({
      sourceIndex: 3,
      destinationIndex: 0
    }) );

    const layerSortOrder = getState()._editor.layers.layerSortOrder;

    expect(layerSortOrder).toEqual(['uid-for-layer-4', 'uid-for-layer-1', 'uid-for-layer-2', 'uid-for-layer-3']);
  });
});
