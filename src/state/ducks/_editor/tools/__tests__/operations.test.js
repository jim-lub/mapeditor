import { configureTestStore } from 'state/store';

import * as operations from '../operations';
import * as selectors from '../selectors';
import * as toolTypes from 'lib/constants/toolTypes';

describe('tools/operations', () => {
  const initialState = {
    _editor: {
      tools: {
        currentTool: null,
        color: {}
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
    _editor: {
      tools: {
        currentTool: null,
        color: {}
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
