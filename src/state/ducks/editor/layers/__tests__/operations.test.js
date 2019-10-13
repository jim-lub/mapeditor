import { configureTestStore } from 'state/store';

import * as operations from '../operations';
import * as selectors from '../selectors';
import * as layerTypes from 'lib/constants/layerTypes';

describe('layer/operations', () => {
  it('should clear the store', () => {
    const initialState = {
      editor: {
        layers: {
          activeLayerId: 'uid-for-layer-one',
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

    const { dispatch, getState } = configureTestStore(initialState);

    dispatch( operations.clearStore() );

    const newState = getState();
    const layerSortOrderLength = selectors.getLayerSortOrder(newState).length;
    const layerPropertiesObject = selectors.getLayerPropertiesObject(newState);
    const layerPropertiesEntries = Object.keys(layerPropertiesObject).length;
    const activeLayerId = selectors.getActiveLayerId(newState);

    expect(layerSortOrderLength).toBe(0);
    expect(layerPropertiesEntries).toBe(0);
    expect(activeLayerId).toBe(null);
  });
});

describe('layer/operations', () => {
  it('should create a new layer', () => {
    const initialState = {
      editor: {
        layers: {
          activeLayerId: null,
          layerProperties: {},
          layerSortOrder: []
        }
      }
    }

    const { dispatch, getState } = configureTestStore(initialState);

    dispatch( operations.createLayer({
          layerType: layerTypes.color,
          layerName: "layer-one",
          tileSize: { width: 32, height: 32 }
        }) );

    const newState = getState();
    const layerSortOrderLength = selectors.getLayerSortOrder(newState).length;
    const layerPropertiesObject = selectors.getLayerPropertiesObject(newState);
    const layerPropertiesEntries = Object.keys(layerPropertiesObject).length;
    const layerPropertiesById = Object.values(layerPropertiesObject)[0];

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
      editor: {
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

    const { dispatch, getState } = configureTestStore(initialState);

    dispatch( operations.deleteLayer({
      layerId: 'uid-for-layer-one'
    }) );

    const newState = getState();
    const layerSortOrderLength = selectors.getLayerSortOrder(newState).length;
    const layerPropertiesObject = selectors.getLayerPropertiesObject(newState);
    const layerPropertiesEntries = Object.keys(layerPropertiesObject).length;

    expect(layerSortOrderLength).toBe(0);
    expect(layerPropertiesEntries).toBe(0);
  });
});

describe('layer/operations', () => {
  it('should update the name of a layer', () => {
    const initialState = {
      editor: {
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

    const { dispatch, getState } = configureTestStore(initialState);

    dispatch( operations.updateLayer({
      layerId: 'uid-for-layer-one',
      layerName: 'layer-one-2'
    }) );

    const newState = getState();
    const layerPropertiesById = selectors.getLayerPropertiesById(newState, { layerId: 'uid-for-layer-one' });

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
    editor: {
      layers: {
        activeLayerId: null,
        layerProperties: {},
        layerSortOrder: ['uid-for-layer-1', 'uid-for-layer-2', 'uid-for-layer-3', 'uid-for-layer-4']
      }
    }
  }

  it('should move a layer #1', () => {
    const { dispatch, getState } = configureTestStore(initialState);

    dispatch( operations.moveLayer({
      sourceIndex: 0,
      destinationIndex: 2
    }) );

    const newState = getState();
    const layerSortOrder = selectors.getLayerSortOrder(newState);

    expect(layerSortOrder).toEqual(['uid-for-layer-2', 'uid-for-layer-3', 'uid-for-layer-1', 'uid-for-layer-4']);
  });

  it('should move a layer #2', () => {
    const { dispatch, getState } = configureTestStore(initialState);

    dispatch( operations.moveLayer({
      sourceIndex: 3,
      destinationIndex: 0
    }) );

    const newState = getState();
    const layerSortOrder = selectors.getLayerSortOrder(newState);

    expect(layerSortOrder).toEqual(['uid-for-layer-4', 'uid-for-layer-1', 'uid-for-layer-2', 'uid-for-layer-3']);
  });
});

describe('layer/operations', () => {
  const initialState = {
    editor: {
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

  const { dispatch, getState } = configureTestStore(initialState);

  it('should toggle the layer visibility #1', () => {
    dispatch( operations.toggleLayerVisibility({
      layerId: 'uid-for-layer-one'
    }) );

    const newState = getState();
    const layerPropertiesById = selectors.getLayerPropertiesById(newState, { layerId: 'uid-for-layer-one' });

    expect(layerPropertiesById).toEqual({
      layerType: layerTypes.color,
      layerName: 'layer-one',
      tileSize: { width: 32, height: 32 },
      visible: false,
      locked: false
    });
  });

  it('should toggle the layer visibility #2', () => {
    dispatch( operations.toggleLayerVisibility({
      layerId: 'uid-for-layer-one'
    }) );

    const newState = getState();
    const layerPropertiesById = selectors.getLayerPropertiesById(newState, { layerId: 'uid-for-layer-one' });

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
  const initialState = {
    editor: {
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

  const { dispatch, getState } = configureTestStore(initialState);

  it('should toggle the layer lock #1', () => {
    dispatch( operations.toggleLayerLock({
      layerId: 'uid-for-layer-one'
    }) );

    const newState = getState();
    const layerPropertiesById = selectors.getLayerPropertiesById(newState, { layerId: 'uid-for-layer-one' });

    expect(layerPropertiesById).toEqual({
      layerType: layerTypes.color,
      layerName: 'layer-one',
      tileSize: { width: 32, height: 32 },
      visible: true,
      locked: true
    });
  });

  it('should toggle the layer lock #2', () => {
    dispatch( operations.toggleLayerLock({
      layerId: 'uid-for-layer-one'
    }) );

    const newState = getState();
    const layerPropertiesById = selectors.getLayerPropertiesById(newState, { layerId: 'uid-for-layer-one' });

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
  it('should set the activeLayerId', () => {
    const initialState = {
      editor: {
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

    const { dispatch, getState } = configureTestStore(initialState);

    dispatch( operations.setActiveLayerId({
      layerId: 'uid-for-layer-one'
    }) );

    const newState = getState();
    const activeLayerId = selectors.getActiveLayerId(newState);

    expect(activeLayerId).toBe('uid-for-layer-one');
  });
});
