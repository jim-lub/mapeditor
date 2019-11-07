import { configureTestStore } from 'state/store';

import * as operations from '../operations';
import * as selectors from '../selectors';
import * as toolTypes from 'lib/constants/toolTypes';

describe('tools/operations', () => {
  const initialState = {
    editor: {
      tools: {
        currentTool: null,
        colorValue: {}
      }
    }
  }

  const { dispatch, getState } = configureTestStore(initialState);

  it('should set the current tool to `paintBrush`', () => {
    dispatch( operations.setCurrentTool({ toolType: toolTypes.paintBrush }) );

    const newState = getState();
    const currentTool = selectors.getCurrentTool(newState);

    expect(currentTool).toBe(toolTypes.paintBrush);
  });

  it('should set the current tool to `tileStamp`', () => {
    dispatch( operations.setCurrentTool({ toolType: toolTypes.tileStamp }) );

    const newState = getState();
    const currentTool = selectors.getCurrentTool(newState);

    expect(currentTool).toBe(toolTypes.tileStamp);
  });

  it('should set the current tool to `eraser`', () => {
    dispatch( operations.setCurrentTool({ toolType: toolTypes.eraser }) );

    const newState = getState();
    const currentTool = selectors.getCurrentTool(newState);

    expect(currentTool).toBe(toolTypes.eraser);
  });

  it('should set the current tool to `eyeDropper`', () => {
    dispatch( operations.setCurrentTool({ toolType: toolTypes.eyeDropper }) );

    const newState = getState();
    const currentTool = selectors.getCurrentTool(newState);

    expect(currentTool).toBe(toolTypes.eyeDropper);
  });
});

describe('tools/operations', () => {
  const initialState = {
    editor: {
      tools: {
        currentTool: null,
        colorValue: null
      }
    }
  }

  const { dispatch, getState } = configureTestStore(initialState);

  it('should change the color value by `hex`', () => {
    dispatch( operations.setColorValue({
      hex: "#fafafa"
    }) );

    const newState = getState();
    const colorValue = selectors.getColorValue(newState);

    expect(colorValue).toEqual({
      hex: "#fafafa",
      rgb: {},
      hsl: {}
    });
  });

  it('should change the color value by `rgb`', () => {
    dispatch( operations.setColorValue({
      rgb: {
        r: 255,
        g: 255,
        b: 255
      }
    }) );

    const newState = getState();
    const colorValue = selectors.getColorValue(newState);

    expect(colorValue).toEqual({
      hex: "",
      rgb: {
        r: 255,
        g: 255,
        b: 255
      },
      hsl: {}
    });
  });
});

describe('tools/operations', () => {
  const initialState = {
    editor: {
      tools: {
        currentTool: null,
        tileSelection: {
          grid: [],
          list: []
        }
      }
    }
  }

  const { dispatch, getState } = configureTestStore(initialState);

  it('should convert the selected tiles to a grid and list', () => {
    dispatch( operations.setTileSelection({
      selected: [
        {
          columnIndex: 1,
          rowIndex: 1
        },
        {
          columnIndex: 2,
          rowIndex: 0
        },
        {
          columnIndex: 3,
          rowIndex: 1
        },
      ]
    }) );

    const newState = getState();
    const { grid, list } = selectors.getTileSelection(newState);

    expect(grid).toEqual([
      [null, { tilesetColumnIndex: 1, tilesetRowIndex: 1 }],
      [{ tilesetColumnIndex: 2, tilesetRowIndex: 0 }, null],
      [null, { tilesetColumnIndex: 3, tilesetRowIndex: 1 }]
    ]);

    expect(list).toEqual([
      { columnIndex: 0, rowIndex: 1, tilesetColumnIndex: 1, tilesetRowIndex: 1 },
      { columnIndex: 1, rowIndex: 0, tilesetColumnIndex: 2, tilesetRowIndex: 0 },
      { columnIndex: 2, rowIndex: 1, tilesetColumnIndex: 3, tilesetRowIndex: 1 },
    ]);
  });

  it('should clear the tile selection', () => {
    dispatch( operations.clearTileSelection() );

    const newState = getState();
    const { grid, list } = selectors.getTileSelection(newState);

    expect(grid).toEqual([]);
    expect(list).toEqual([]);
  });
});

describe('tools/operations', () => {
  const initialState = {
    editor: {
      tools: {
        zoomScaleModifier: 1
      }
    }
  }

  const { dispatch, getState } = configureTestStore(initialState);

  it('should zoom in #1', () => {
    dispatch( operations.zoomIn() );

    const newState = getState();
    const zoomScaleModifier = selectors.getZoomScaleModifier(newState);

    expect(zoomScaleModifier).toBe(1.25);
  });

  it('should zoom in #2', () => {
    dispatch( operations.zoomIn() );

    const newState = getState();
    const zoomScaleModifier = selectors.getZoomScaleModifier(newState);

    expect(zoomScaleModifier).toBe(1.50);
  });

  it('should reset zoom', () => {
    dispatch( operations.resetZoom() );

    const newState = getState();
    const zoomScaleModifier = selectors.getZoomScaleModifier(newState);

    expect(zoomScaleModifier).toBe(1);
  });

  it('should zoom out #1', () => {
    dispatch( operations.zoomOut() );

    const newState = getState();
    const zoomScaleModifier = selectors.getZoomScaleModifier(newState);

    expect(zoomScaleModifier).toBe(0.75);
  });

  it('should zoom out #2', () => {
    dispatch( operations.zoomOut() );

    const newState = getState();
    const zoomScaleModifier = selectors.getZoomScaleModifier(newState);

    expect(zoomScaleModifier).toBe(0.50);
  });
});
